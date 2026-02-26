<template>
  <div 
    class="deployment-badge" 
    :class="[`deployment-badge--${variant}`, { 'deployment-badge--compact': compact }]"
    @click="handleClick"
    :title="title"
  >
    <!-- 版本图标 -->
    <span class="deployment-badge__icon">
      <Rocket :size="iconSize" />
    </span>
    
    <!-- 版本信息 -->
    <span class="deployment-badge__content">
      <code class="deployment-badge__hash">{{ displayHash }}</code>
      <span v-if="!compact" class="deployment-badge__time">{{ relativeTime }}</span>
    </span>
    
    <!-- 复制成功提示 -->
    <Transition name="fade">
      <span v-if="copySuccess" class="deployment-badge__copied">
        <Check :size="iconSize - 2" />
      </span>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Rocket, Check } from 'lucide-vue-next'

const props = defineProps({
  versionUrl: {
    type: String,
    default: '/version.json'
  },
  variant: {
    type: String,
    default: 'default', // 'default' | 'minimal' | 'inline'
    validator: (v) => ['default', 'minimal', 'inline'].includes(v)
  },
  compact: {
    type: Boolean,
    default: false
  },
  iconSize: {
    type: Number,
    default: 14
  },
  title: {
    type: String,
    default: '点击复制版本号'
  }
})

const emit = defineEmits(['click', 'copy'])

const version = ref(null)
const copySuccess = ref(false)

const displayHash = computed(() => {
  if (!version.value?.hash) return 'unknown'
  // 显示完整 hash 或截断版本
  return props.compact ? version.value.hash.substring(0, 7) : version.value.hash
})

const relativeTime = computed(() => {
  if (!version.value?.time) return ''

  try {
    // 处理时间格式 "2026-02-24 07:22:49 +0000"
    const timeStr = version.value.time.replace(' ', 'T').replace(' +0000', 'Z')
    const date = new Date(timeStr)
    if (isNaN(date.getTime())) return ''

    const now = new Date()
    const diffMs = now - date
    const diffMinutes = Math.floor(diffMs / 1000 / 60)

    if (diffMinutes < 1) return '刚刚'
    if (diffMinutes < 60) return `${diffMinutes}分钟前`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}小时前`
    return `${Math.floor(diffMinutes / 1440)}天前`
  } catch (e) {
    return ''
  }
})

onMounted(async () => {
  try {
    const res = await fetch(props.versionUrl)
    version.value = await res.json()
  } catch (e) {
    console.warn('Failed to load version:', e)
  }
})

async function handleClick() {
  emit('click')
  
  if (!version.value?.hash) return

  try {
    await navigator.clipboard.writeText(version.value.hash)
    copySuccess.value = true
    emit('copy', version.value.hash)
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (e) {
    console.error('Failed to copy:', e)
  }
}
</script>

<style scoped>
.deployment-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: rgba(57, 197, 187, 0.1);
  border: 1px solid rgba(57, 197, 187, 0.2);
  border-radius: 8px;
  font-size: 12px;
  color: #39c5bb;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.deployment-badge:hover {
  background: rgba(57, 197, 187, 0.15);
  border-color: rgba(57, 197, 187, 0.3);
  transform: translateY(-1px);
}

.deployment-badge:active {
  transform: translateY(0);
}

/* 变体样式 */
.deployment-badge--minimal {
  padding: 4px 8px;
  background: transparent;
  border: none;
  font-size: 11px;
}

.deployment-badge--minimal:hover {
  background: rgba(57, 197, 187, 0.1);
}

.deployment-badge--inline {
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.04);
  border: none;
  border-radius: 4px;
  font-size: 11px;
}

.deployment-badge--inline:hover {
  background: rgba(0, 0, 0, 0.08);
}

/* 紧凑模式 */
.deployment-badge--compact {
  padding: 4px 8px;
  font-size: 11px;
}

.deployment-badge--compact .deployment-badge__icon {
  display: none;
}

/* 图标 */
.deployment-badge__icon {
  display: flex;
  align-items: center;
  color: #39c5bb;
}

/* 内容区域 */
.deployment-badge__content {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 版本号 */
.deployment-badge__hash {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Fira Code', monospace;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 时间 */
.deployment-badge__time {
  opacity: 0.7;
  font-size: 11px;
}

/* 复制成功 */
.deployment-badge__copied {
  display: flex;
  align-items: center;
  color: #10b981;
  margin-left: 2px;
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .deployment-badge {
    background: rgba(57, 197, 187, 0.15);
    border-color: rgba(57, 197, 187, 0.3);
    color: #5dd9cd;
  }

  .deployment-badge--inline {
    background: rgba(255, 255, 255, 0.06);
  }
  
  .deployment-badge--inline:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* Miku 主题变量适配 */
:global(.miku-theme) .deployment-badge,
:global([data-theme="miku"]) .deployment-badge {
  background: var(--miku-bg-secondary, rgba(57, 197, 187, 0.1));
  border-color: var(--miku-border, rgba(57, 197, 187, 0.2));
  color: var(--miku-accent, #39c5bb);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
