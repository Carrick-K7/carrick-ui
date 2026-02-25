<template>
  <div class="c-version-info" v-if="version">
    <span class="c-version-info__brand">{{ brandText }}</span>
    <span class="c-version-info__divider">·</span>
    <code
      class="c-version-info__hash"
      :class="{ 'c-version-info__hash--copied': copySuccess }"
      @click="copyHash"
      :title="copySuccess ? '已复制!' : '点击复制'"
    >
      {{ version.hash }}
    </code>
    <span class="c-version-info__divider">·</span>
    <span class="c-version-info__time">{{ relativeTime }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  versionUrl: {
    type: String,
    default: '/version.json'
  },
  brandText: {
    type: String,
    default: 'Powered by Carrick'
  }
})

const version = ref(null)
const copySuccess = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(props.versionUrl)
    version.value = await res.json()
  } catch (e) {
    console.error('Failed to load version:', e)
  }
})

const relativeTime = computed(() => {
  if (!version.value?.time) return ''

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
})

async function copyHash() {
  if (!version.value?.hash) return

  try {
    await navigator.clipboard.writeText(version.value.hash)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (e) {
    console.error('Failed to copy:', e)
  }
}
</script>

<style scoped>
.c-version-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 12px;
  font-size: 12px;
  color: #999;
  background: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.c-version-info__divider {
  margin: 0 8px;
  opacity: 0.5;
}

.c-version-info__hash {
  cursor: pointer;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 11px;
  transition: all 0.2s ease;
}

.c-version-info__hash:hover {
  background: rgba(0, 0, 0, 0.08);
}

.c-version-info__hash--copied {
  background: rgba(57, 197, 187, 0.15);
  color: #39c5bb;
}

.c-version-info__time {
  opacity: 0.8;
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .c-version-info {
    color: #666;
    background: rgba(255, 255, 255, 0.02);
    border-top-color: rgba(255, 255, 255, 0.06);
  }

  .c-version-info__hash {
    background: rgba(255, 255, 255, 0.06);
  }

  .c-version-info__hash:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* Miku 主题变量适配 */
:global(.miku-theme) .c-version-info,
:global([data-theme="miku"]) .c-version-info {
  color: var(--miku-text-muted, #999);
  background: var(--miku-bg-secondary, rgba(0, 0, 0, 0.02));
  border-top-color: var(--miku-border, rgba(0, 0, 0, 0.06));
}

:global(.miku-theme) .c-version-info__hash,
:global([data-theme="miku"]) .c-version-info__hash {
  background: var(--miku-bg-tertiary, rgba(0, 0, 0, 0.04));
}

:global(.miku-theme) .c-version-info__hash:hover,
:global([data-theme="miku"]) .c-version-info__hash:hover {
  background: var(--miku-border, rgba(0, 0, 0, 0.08));
}
</style>
