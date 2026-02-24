<template>
  <button
    :type="nativeType"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <!-- Loading 图标 -->
    <Loader2 v-if="loading" class="c-button__icon c-button__icon--spin" :size="iconSize" />
    
    <!-- 左侧图标 -->
    <component 
      v-else-if="icon" 
      :is="icon" 
      class="c-button__icon" 
      :size="iconSize"
    />
    
    <!-- 内容 -->
    <span v-if="$slots.default" class="c-button__content">
      <slot />
    </span>
    
    <!-- 右侧图标 -->
    <component 
      v-if="iconRight && !loading" 
      :is="iconRight" 
      class="c-button__icon c-button__icon--right" 
      :size="iconSize"
    />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

defineEmits(['click'])

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['tiny', 'small', 'medium', 'large'].includes(value)
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
  ghost: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  dashed: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  iconRight: {
    type: [Object, Function],
    default: null
  },
  nativeType: {
    type: String,
    default: 'button'
  },
  color: {
    type: String,
    default: ''
  },
  useCarrickColor: {
    type: Boolean,
    default: true
  }
})

// 尺寸配置
const sizeConfig = {
  tiny: { height: '22px', padding: '0 6px', fontSize: '12px', icon: 12 },
  small: { height: '28px', padding: '0 10px', fontSize: '13px', icon: 14 },
  medium: { height: '34px', padding: '0 14px', fontSize: '14px', icon: 16 },
  large: { height: '40px', padding: '0 18px', fontSize: '15px', icon: 18 }
}

const iconSize = computed(() => sizeConfig[props.size].icon)

// 按钮类型样式映射
const typeClasses = {
  primary: 'c-button--primary',
  default: 'c-button--default',
  success: 'c-button--success',
  warning: 'c-button--warning',
  error: 'c-button--error',
  info: 'c-button--info'
}

// 计算按钮类名
const buttonClasses = computed(() => {
  const classes = [
    'c-button',
    typeClasses[props.type] || 'c-button--primary',
    `c-button--${props.size}`,
    {
      'c-button--disabled': props.disabled,
      'c-button--loading': props.loading,
      'c-button--ghost': props.ghost,
      'c-button--text': props.text,
      'c-button--dashed': props.dashed,
      'c-button--round': props.round,
      'c-button--circle': props.circle,
      'c-button--block': props.block,
      'c-button--with-icon': props.icon || props.loading,
      'c-button--icon-only': props.circle && !$slots.default
    }
  ]
  
  return classes
})
</script>

<style scoped>
.c-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
}

.c-button:active:not(.c-button--disabled):not(.c-button--loading) {
  transform: scale(0.98);
}

.c-button:focus-visible {
  outline: 2px solid var(--miku-primary);
  outline-offset: 2px;
}

/* Primary 样式 */
.c-button--primary {
  background-color: var(--miku-primary);
  color: white;
}

.c-button--primary:hover:not(.c-button--disabled):not(.c-button--loading) {
  background-color: var(--miku-primary-hover);
}

.c-button--primary.c-button--ghost {
  background-color: transparent;
  color: var(--miku-primary);
  box-shadow: inset 0 0 0 1px var(--miku-primary);
}

.c-button--primary.c-button--ghost:hover:not(.c-button--disabled) {
  background-color: rgba(57, 197, 187, 0.1);
}

.c-button--primary.c-button--text {
  background-color: transparent;
  color: var(--miku-primary);
}

.c-button--primary.c-button--text:hover:not(.c-button--disabled) {
  background-color: rgba(57, 197, 187, 0.1);
}

/* Default 样式 */
.c-button--default {
  background-color: var(--miku-bg-secondary);
  color: var(--miku-text);
}

.c-button--default:hover:not(.c-button--disabled):not(.c-button--loading) {
  background-color: var(--miku-bg-tertiary);
}

.c-button--default.c-button--ghost {
  background-color: transparent;
  color: var(--miku-text);
  box-shadow: inset 0 0 0 1px var(--miku-border);
}

.c-button--default.c-button--ghost:hover:not(.c-button--disabled) {
  background-color: var(--miku-bg-secondary);
}

/* Success 样式 */
.c-button--success {
  background-color: var(--miku-success);
  color: white;
}

.c-button--success:hover:not(.c-button--disabled):not(.c-button--loading) {
  background-color: #2DB14E;
}

.c-button--success.c-button--ghost {
  background-color: transparent;
  color: var(--miku-success);
  box-shadow: inset 0 0 0 1px var(--miku-success);
}

/* Warning 样式 */
.c-button--warning {
  background-color: var(--miku-warning);
  color: white;
}

.c-button--warning:hover:not(.c-button--disabled):not(.c-button--loading) {
  background-color: #E68600;
}

.c-button--warning.c-button--ghost {
  background-color: transparent;
  color: var(--miku-warning);
  box-shadow: inset 0 0 0 1px var(--miku-warning);
}

/* Error 样式 */
.c-button--error {
  background-color: var(--miku-error);
  color: white;
}

.c-button--error:hover:not(.c-button--disabled):not(.c-button--loading) {
  background-color: #E6352B;
}

.c-button--error.c-button--ghost {
  background-color: transparent;
  color: var(--miku-error);
  box-shadow: inset 0 0 0 1px var(--miku-error);
}

/* Info 样式 */
.c-button--info {
  background-color: var(--miku-info);
  color: white;
}

.c-button--info:hover:not(.c-button--disabled):not(.c-button--loading) {
  background-color: #0066CC;
}

.c-button--info.c-button--ghost {
  background-color: transparent;
  color: var(--miku-info);
  box-shadow: inset 0 0 0 1px var(--miku-info);
}

/* 尺寸 */
.c-button--tiny {
  height: 22px;
  padding: 0 6px;
  font-size: 12px;
  border-radius: 6px;
}

.c-button--small {
  height: 28px;
  padding: 0 10px;
  font-size: 13px;
  border-radius: 6px;
}

.c-button--medium {
  height: 34px;
  padding: 0 14px;
  font-size: 14px;
  border-radius: 8px;
}

.c-button--large {
  height: 40px;
  padding: 0 18px;
  font-size: 15px;
  border-radius: 10px;
}

/* Round */
.c-button--round {
  border-radius: 100px;
}

/* Circle */
.c-button--circle {
  border-radius: 50%;
  padding: 0;
}

.c-button--circle.c-button--tiny {
  width: 22px;
}

.c-button--circle.c-button--small {
  width: 28px;
}

.c-button--circle.c-button--medium {
  width: 34px;
}

.c-button--circle.c-button--large {
  width: 40px;
}

/* Block */
.c-button--block {
  display: flex;
  width: 100%;
}

/* Dashed */
.c-button--dashed {
  border-style: dashed;
}

/* Disabled */
.c-button--disabled,
.c-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading */
.c-button--loading {
  cursor: wait;
}

.c-button__icon--spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 图标间距 */
.c-button--with-icon .c-button__content {
  margin-left: 2px;
}

/* 移动端触摸优化 */
@media (pointer: coarse) {
  .c-button {
    min-height: 44px;
  }
  
  .c-button--tiny {
    min-height: 32px;
  }
  
  .c-button--small {
    min-height: 36px;
  }
}
</style>
