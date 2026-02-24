<template>
  <div
    class="c-status-dot"
    :class="[
      `c-status-dot--${status}`,
      `c-status-dot--${size}`,
      { 'c-status-dot--pulse': pulse, 'c-status-dot--clickable': $attrs.onClick }
    ]"
    @click="handleClick"
  >
    <span class="c-status-dot__indicator">
      <span v-if="pulse" class="c-status-dot__pulse" />
    </span>
    <span v-if="showText" class="c-status-dot__text">
      <slot :status="status">{{ displayText }}</slot>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'online',
    validator(value) {
      return ['online', 'offline', 'away', 'busy', 'warning', 'error'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  pulse: {
    type: Boolean,
    default: false
  },
  showText: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const statusTextMap = {
  online: '在线',
  offline: '离线',
  away: '离开',
  busy: '忙碌',
  warning: '警告',
  error: '错误'
}

const displayText = computed(() => {
  return props.text || statusTextMap[props.status] || props.status
})

const handleClick = (event) => {
  emit('click', event)
}
</script>

<style scoped>
.c-status-dot {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.c-status-dot--clickable {
  cursor: pointer;
  padding: 8px;
  margin: -8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.c-status-dot--clickable:hover {
  background-color: var(--miku-bg-secondary);
}

.c-status-dot--clickable:active {
  background-color: var(--miku-bg-tertiary);
}

.c-status-dot__indicator {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
}

/* 尺寸定义 */
.c-status-dot--small .c-status-dot__indicator {
  width: 6px;
  height: 6px;
}

.c-status-dot--medium .c-status-dot__indicator {
  width: 10px;
  height: 10px;
}

.c-status-dot--large .c-status-dot__indicator {
  width: 14px;
  height: 14px;
}

/* 状态颜色 - iOS 标准色 */
.c-status-dot--online .c-status-dot__indicator {
  background-color: #34C759;
}

.c-status-dot--offline .c-status-dot__indicator {
  background-color: #8E8E93;
}

.c-status-dot--away .c-status-dot__indicator {
  background-color: #FF9500;
}

.c-status-dot--busy .c-status-dot__indicator {
  background-color: #FF3B30;
}

.c-status-dot--warning .c-status-dot__indicator {
  background-color: #FF9500;
}

.c-status-dot--error .c-status-dot__indicator {
  background-color: #FF3B30;
}

/* 脉冲动画 */
.c-status-dot--pulse .c-status-dot__pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: status-pulse 2s ease-out infinite;
}

.c-status-dot--small.c-status-dot--pulse .c-status-dot__pulse {
  width: 12px;
  height: 12px;
}

.c-status-dot--medium.c-status-dot--pulse .c-status-dot__pulse {
  width: 20px;
  height: 20px;
}

.c-status-dot--large.c-status-dot--pulse .c-status-dot__pulse {
  width: 28px;
  height: 28px;
}

.c-status-dot--online.c-status-dot--pulse .c-status-dot__pulse {
  background-color: rgba(52, 199, 89, 0.4);
}

.c-status-dot--warning.c-status-dot--pulse .c-status-dot__pulse,
.c-status-dot--away.c-status-dot--pulse .c-status-dot__pulse {
  background-color: rgba(255, 149, 0, 0.4);
}

.c-status-dot--busy.c-status-dot--pulse .c-status-dot__pulse,
.c-status-dot--error.c-status-dot--pulse .c-status-dot__pulse {
  background-color: rgba(255, 59, 48, 0.4);
}

.c-status-dot--offline.c-status-dot--pulse .c-status-dot__pulse {
  background-color: rgba(142, 142, 147, 0.4);
}

@keyframes status-pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

/* 文字样式 */
.c-status-dot__text {
  font-size: 14px;
  color: var(--miku-text);
  line-height: 1.5;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .c-status-dot__text {
    color: var(--miku-text);
  }
}

:global(.dark-mode) .c-status-dot__text {
  color: var(--miku-text);
}

/* 移动端触摸优化 */
@media (pointer: coarse) {
  .c-status-dot--clickable {
    min-height: 44px;
    min-width: 44px;
    justify-content: center;
  }
}

/* 触摸反馈 */
.c-status-dot--clickable {
  -webkit-tap-highlight-color: transparent;
}

.c-status-dot--clickable:active {
  transform: scale(0.98);
}
</style>
