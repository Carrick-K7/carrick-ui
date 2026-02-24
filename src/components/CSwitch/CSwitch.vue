<template>
  <div
    class="c-switch"
    :class="[
      `c-switch--${size}`,
      { 
        'c-switch--checked': modelValue,
        'c-switch--disabled': disabled,
        'c-switch--loading': loading,
        'c-switch--with-text': activeText || inactiveText
      }
    ]"
    @click="handleClick"
  >
    <span v-if="inactiveText" class="c-switch__label c-switch__label--left">
      {{ inactiveText }}
    </span>
    
    <div
      class="c-switch__core"
      :style="coreStyle"
      role="switch"
      :aria-checked="modelValue"
      :aria-disabled="disabled"
    >
      <div class="c-switch__handle" :style="handleStyle">
        <span v-if="loading" class="c-switch__loading-icon">
          <Loader2 :size="loadingIconSize" class="c-switch__spinner" />
        </span>
        <span v-else-if="modelValue" class="c-switch__action">
          <slot name="activeAction">
            <Check v-if="size !== 'small'" :size="actionIconSize" />
          </slot>
        </span>
        <span v-else class="c-switch__action">
          <slot name="inactiveAction">
            <X v-if="size !== 'small'" :size="actionIconSize" />
          </slot>
        </span>
      </div>
    </div>
    
    <span v-if="activeText" class="c-switch__label c-switch__label--right">
      {{ activeText }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Loader2, Check, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  activeText: {
    type: String,
    default: ''
  },
  inactiveText: {
    type: String,
    default: ''
  },
  activeColor: {
    type: String,
    default: ''
  },
  inactiveColor: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// 尺寸配置
const sizeConfig = {
  small: { width: 32, height: 18, handle: 14, icon: 8 },
  medium: { width: 44, height: 24, handle: 20, icon: 12 },
  large: { width: 56, height: 30, handle: 26, icon: 16 }
}

const currentSize = computed(() => sizeConfig[props.size])

const actionIconSize = computed(() => currentSize.value.icon)
const loadingIconSize = computed(() => currentSize.value.icon + 2)

// 核心区域样式 - iOS 风格
const coreStyle = computed(() => {
  const { width, height } = currentSize.value
  const backgroundColor = props.modelValue
    ? (props.activeColor || 'var(--miku-primary, #39C5BB)')
    : (props.inactiveColor || 'var(--miku-switch-inactive, #E5E5EA)')
  
  return {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${height / 2}px`,
    backgroundColor: props.disabled ? `${backgroundColor}66` : backgroundColor
  }
})

// 手柄样式
const handleStyle = computed(() => {
  const { height, handle } = currentSize.value
  const padding = (height - handle) / 2
  const translateX = props.modelValue 
    ? currentSize.value.width - handle - padding * 2 
    : 0
  
  return {
    width: `${handle}px`,
    height: `${handle}px`,
    transform: `translateX(${translateX}px)`
  }
})

const handleClick = () => {
  if (props.disabled || props.loading) return
  
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.c-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.c-switch--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.c-switch--loading {
  cursor: wait;
}

.c-switch__core {
  position: relative;
  flex-shrink: 0;
  transition: background-color 0.3s ease;
}

.c-switch__handle {
  position: absolute;
  top: 50%;
  left: 2px;
  margin-top: 0;
  transform: translateY(-50%);
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--miku-text-secondary);
}

.c-switch__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.c-switch__loading-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.c-switch__spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.c-switch__label {
  font-size: 14px;
  color: var(--miku-text);
  transition: color 0.3s ease;
}

.c-switch__label--left {
  color: var(--miku-text-secondary);
}

.c-switch__label--right {
  color: var(--miku-primary);
}

.c-switch--checked .c-switch__label--left {
  color: var(--miku-text-secondary);
}

.c-switch:not(.c-switch--checked) .c-switch__label--right {
  color: var(--miku-text-secondary);
}

/* 尺寸调整 */
.c-switch--small .c-switch__label {
  font-size: 12px;
}

.c-switch--large .c-switch__label {
  font-size: 16px;
}

/* 触摸反馈 */
.c-switch:not(.c-switch--disabled):not(.c-switch--loading):active .c-switch__handle {
  transform: translateY(-50%) scale(0.95);
}

.c-switch--checked:not(.c-switch--disabled):not(.c-switch--loading):active .c-switch__handle {
  transform: translateY(-50%) scale(0.95);
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .c-switch__label {
    color: var(--miku-text);
  }
  
  .c-switch__label--left,
  .c-switch:not(.c-switch--checked) .c-switch__label--right {
    color: var(--miku-text-secondary);
  }
}

:global(.dark-mode) .c-switch__label {
  color: var(--miku-text);
}

:global(.dark-mode) .c-switch__label--left,
:global(.dark-mode) .c-switch:not(.c-switch--checked) .c-switch__label--right {
  color: var(--miku-text-secondary);
}

/* 移动端触摸优化 */
@media (pointer: coarse) {
  .c-switch__core {
    min-height: 44px;
    min-width: 44px;
  }
  
  .c-switch--small .c-switch__core {
    transform: scale(1.2);
  }
  
  .c-switch__label {
    font-size: 16px;
  }
}

/* 焦点样式 */
.c-switch__core:focus-visible {
  outline: 2px solid var(--miku-primary);
  outline-offset: 2px;
}
</style>
