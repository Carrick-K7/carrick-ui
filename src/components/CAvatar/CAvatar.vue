<template>
  <div
    class="c-avatar"
    :class="[
      `c-avatar--${shape}`,
      typeof size === 'string' ? `c-avatar--${size}` : '',
      { 'c-avatar--border': border, 'c-avatar--clickable': $attrs.onClick }
    ]"
    :style="avatarStyle"
    @click="handleClick"
  >
    <img
      v-if="src && !hasError"
      class="c-avatar__image"
      :src="src"
      :alt="alt"
      :style="imageStyle"
      @error="handleError"
    />
    
    <div
      v-else-if="$slots.default"
      class="c-avatar__content"
      :style="contentStyle"
    >
      <slot />
    </div>
    
    <div
      v-else
      class="c-avatar__fallback"
      :style="fallbackStyle"
    >
      <slot name="fallback">
        <User v-if="!fallbackText" :size="fallbackIconSize" />
        <span v-else>{{ fallbackText }}</span>
      </slot>
    </div>
    
    <span
      v-if="status"
      class="c-avatar__status"
      :class="`c-avatar__status--${status}`"
      :style="statusStyle"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { User } from 'lucide-vue-next'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number],
    default: 'medium',
    validator(value) {
      if (typeof value === 'number') return value > 0
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  shape: {
    type: String,
    default: 'circle',
    validator(value) {
      return ['circle', 'square', 'rounded'].includes(value)
    }
  },
  fallback: {
    type: String,
    default: ''
  },
  border: {
    type: Boolean,
    default: false
  },
  borderColor: {
    type: String,
    default: 'var(--miku-border)'
  },
  status: {
    type: String,
    default: '',
    validator(value) {
      return ['', 'online', 'offline', 'away', 'busy'].includes(value)
    }
  }
})

const emit = defineEmits(['error', 'click'])

const hasError = ref(false)

// 尺寸计算
const sizeMap = {
  small: 32,
  medium: 40,
  large: 56
}

const actualSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  return sizeMap[props.size] || 40
})

const fallbackIconSize = computed(() => Math.round(actualSize.value * 0.5))

const fallbackText = computed(() => {
  if (props.fallback) return props.fallback.slice(0, 2).toUpperCase()
  if (props.alt) return props.alt.slice(0, 1).toUpperCase()
  return ''
})

// 样式计算
const avatarStyle = computed(() => {
  const size = actualSize.value
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size * 0.4}px`
  }
  
  if (props.border) {
    styles.border = `2px solid ${props.borderColor}`
  }
  
  return styles
})

const imageStyle = computed(() => ({
  width: '100%',
  height: '100%',
  borderRadius: getBorderRadius()
}))

const contentStyle = computed(() => ({
  width: '100%',
  height: '100%',
  borderRadius: getBorderRadius(),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--miku-bg-tertiary)',
  color: 'var(--miku-text)'
}))

const fallbackStyle = computed(() => ({
  width: '100%',
  height: '100%',
  borderRadius: getBorderRadius(),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--miku-primary, #39c5bb)',
  color: '#fff',
  fontWeight: 500
}))

const statusStyle = computed(() => {
  const size = actualSize.value
  const statusSize = Math.max(10, size * 0.25)
  const offset = size * 0.05
  
  return {
    width: `${statusSize}px`,
    height: `${statusSize}px`,
    right: `${offset}px`,
    bottom: `${offset}px`,
    borderWidth: `${Math.max(2, statusSize * 0.15)}px`
  }
})

function getBorderRadius() {
  switch (props.shape) {
    case 'circle': return '50%'
    case 'rounded': return '8px'
    case 'square': return '0'
    default: return '50%'
  }
}

const handleError = (event) => {
  hasError.value = true
  emit('error', event)
}

const handleClick = (event) => {
  emit('click', event)
}
</script>

<style scoped>
.c-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.c-avatar--circle {
  border-radius: 50%;
}

.c-avatar--square {
  border-radius: 0;
}

.c-avatar--rounded {
  border-radius: 8px;
}

.c-avatar__image {
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.c-avatar__fallback {
  user-select: none;
}

.c-avatar__content {
  overflow: hidden;
}

.c-avatar__content :deep(svg) {
  width: 60%;
  height: 60%;
}

.c-avatar__status {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-color: var(--miku-bg, #fff);
  flex-shrink: 0;
}

.c-avatar__status--online {
  background-color: #34C759;
}

.c-avatar__status--offline {
  background-color: #8E8E93;
}

.c-avatar__status--away {
  background-color: #FF9500;
}

.c-avatar__status--busy {
  background-color: #FF3B30;
}

.c-avatar--clickable {
  cursor: pointer;
}

.c-avatar--clickable:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.c-avatar--clickable:active {
  transform: scale(0.98);
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .c-avatar__status {
    border-color: var(--miku-bg, #1a1a1a);
  }
  
  .c-avatar__content {
    background-color: var(--miku-bg-tertiary);
    color: var(--miku-text);
  }
}

:global(.dark-mode) .c-avatar__status {
  border-color: var(--miku-bg, #1a1a1a);
}

:global(.dark-mode) .c-avatar__content {
  background-color: var(--miku-bg-tertiary);
  color: var(--miku-text);
}

/* 移动端触摸优化 */
@media (pointer: coarse) {
  .c-avatar--clickable {
    min-width: 44px;
    min-height: 44px;
  }
}

.c-avatar--clickable {
  -webkit-tap-highlight-color: transparent;
}
</style>
