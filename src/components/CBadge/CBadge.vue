<template>
  <span
    class="c-badge"
    :class="[
      `c-badge--${type}`,
      `c-badge--${size}`,
      { 'c-badge--closable': closable }
    ]"
    :style="badgeStyle"
  >
    <span v-if="type === 'badge'" class="c-badge__content">
      <slot />
    </span>
    
    <button
      v-if="closable"
      class="c-badge__close"
      type="button"
      aria-label="关闭"
      @click="handleClose"
    >
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  type: {
    type: String,
    default: 'badge',
    validator(value) {
      return ['badge', 'dot'].includes(value)
    }
  },
  closable: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  }
})

const emit = defineEmits(['close'])

const colorMap = {
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',
  primary: '#39c5bb'
}

const badgeStyle = computed(() => {
  const color = colorMap[props.color] || props.color
  
  if (props.type === 'dot') {
    return {
      backgroundColor: color
    }
  }
  
  return {
    backgroundColor: `${color}15`,
    color: color,
    borderColor: `${color}30`
  }
})

const handleClose = (event) => {
  emit('close', event)
}
</script>

<style scoped>
.c-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: all 0.2s ease;
  user-select: none;
}

/* Badge 类型样式 */
.c-badge--badge {
  border-radius: 8px;
  border: 1px solid transparent;
  font-weight: 500;
}

/* Dot 类型样式 */
.c-badge--dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  padding: 0;
  min-width: 8px;
}

/* 尺寸定义 */
.c-badge--small {
  font-size: 12px;
  padding: 2px 8px;
  height: 20px;
}

.c-badge--small.c-badge--closable {
  padding-right: 4px;
}

.c-badge--medium {
  font-size: 14px;
  padding: 4px 12px;
  height: 28px;
}

.c-badge--medium.c-badge--closable {
  padding-right: 6px;
}

.c-badge--large {
  font-size: 16px;
  padding: 6px 16px;
  height: 36px;
}

.c-badge--large.c-badge--closable {
  padding-right: 8px;
}

/* 内容区域 */
.c-badge__content {
  line-height: 1;
}

/* 关闭按钮 */
.c-badge__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  margin-left: 4px;
  padding: 0;
  border: none;
  background: transparent;
  color: currentColor;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.6;
  transition: all 0.2s ease;
  outline: none;
  touch-action: manipulation;
}

.c-badge__close:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.08);
}

.c-badge__close:active {
  opacity: 0.8;
  transform: scale(0.95);
  background-color: rgba(0, 0, 0, 0.12);
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .c-badge__close:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .c-badge__close:active {
    background-color: rgba(255, 255, 255, 0.15);
  }
}

/* 强制暗色模式类适配 */
:global(.dark-mode) .c-badge__close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

:global(.dark-mode) .c-badge__close:active {
  background-color: rgba(255, 255, 255, 0.15);
}

/* 移动端触摸优化 */
@media (pointer: coarse) {
  .c-badge__close {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    margin-left: 2px;
  }
  
  .c-badge__close svg {
    width: 20px;
    height: 20px;
  }
}

/* 触摸反馈动画 */
.c-badge__close {
  -webkit-tap-highlight-color: transparent;
}

.c-badge__close::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: currentColor;
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, opacity 0.3s;
  pointer-events: none;
}

.c-badge__close:active::after {
  width: 32px;
  height: 32px;
  opacity: 0.1;
}

/* Dot 类型尺寸调整 */
.c-badge--dot.c-badge--small {
  width: 6px;
  height: 6px;
  min-width: 6px;
}

.c-badge--dot.c-badge--medium {
  width: 8px;
  height: 8px;
  min-width: 8px;
}

.c-badge--dot.c-badge--large {
  width: 12px;
  height: 12px;
  min-width: 12px;
}

/* 可关闭状态下的尺寸调整 */
.c-badge--closable .c-badge__content {
  margin-right: 4px;
}
</style>
