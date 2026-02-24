<template>
  <div
    class="c-card"
    :class="[
      `c-card--${size}`,
      {
        'c-card--hoverable': hoverable,
        'c-card--bordered': bordered,
        'c-card--embedded': embedded,
        'c-card--segmented': segmented,
      }
    ]"
  >
    <!-- Header -->
    <div v-if="title || $slots.header || $slots['header-extra']" class="c-card__header">
      <div class="c-card__header-main">
        <div v-if="$slots.header" class="c-card__header-content">
          <slot name="header" />
        </div>
        <div v-else-if="title" class="c-card__title">
          <slot name="title">{{ title }}</slot>
        </div>
      </div>
      
      <div v-if="$slots['header-extra']" class="c-card__header-extra">
        <slot name="header-extra" />
      </div>
    </div>
    
    <!-- Content -->
    <div class="c-card__content" :class="{ 'c-card__content--segmented': contentSegmented }">
      <slot />
    </div>
    
    <!-- Footer -->
    <div v-if="$slots.footer" class="c-card__footer" :class="{ 'c-card__footer--segmented': footerSegmented }">
      <slot name="footer" />
    </div>
    
    <!-- Action -->
    <div v-if="$slots.action" class="c-card__action" :class="{ 'c-card__action--segmented': actionSegmented }">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large', 'huge'].includes(value)
    }
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: false
  },
  embedded: {
    type: Boolean,
    default: false
  },
  segmented: {
    type: [Boolean, Object],
    default: false
  }
})

// 计算分割状态
const contentSegmented = computed(() => {
  if (typeof props.segmented === 'boolean') return props.segmented
  return props.segmented?.content || false
})

const footerSegmented = computed(() => {
  if (typeof props.segmented === 'boolean') return props.segmented
  return props.segmented?.footer || props.segmented?.action || false
})

const actionSegmented = computed(() => {
  if (typeof props.segmented === 'boolean') return props.segmented
  return props.segmented?.action || props.segmented?.footer || false
})
</script>

<style scoped>
.c-card {
  display: flex;
  flex-direction: column;
  background-color: var(--miku-card-bg);
  border-radius: 12px;
  font-family: var(--font-sans);
  transition: all 0.2s ease;
}

/* Size variants */
.c-card--small {
  font-size: 13px;
}

.c-card--small .c-card__header {
  padding: 12px 16px;
}

.c-card--small .c-card__content {
  padding: 16px;
}

.c-card--small .c-card__footer,
.c-card--small .c-card__action {
  padding: 12px 16px;
}

.c-card--medium {
  font-size: 14px;
}

.c-card--medium .c-card__header {
  padding: 16px 20px;
}

.c-card--medium .c-card__content {
  padding: 20px;
}

.c-card--medium .c-card__footer,
.c-card--medium .c-card__action {
  padding: 16px 20px;
}

.c-card--large {
  font-size: 15px;
}

.c-card--large .c-card__header {
  padding: 20px 24px;
}

.c-card--large .c-card__content {
  padding: 24px;
}

.c-card--large .c-card__footer,
.c-card--large .c-card__action {
  padding: 20px 24px;
}

.c-card--huge {
  font-size: 16px;
}

.c-card--huge .c-card__header {
  padding: 24px 32px;
}

.c-card--huge .c-card__content {
  padding: 32px;
}

.c-card--huge .c-card__footer,
.c-card--huge .c-card__action {
  padding: 24px 32px;
}

/* Border */
.c-card--bordered {
  border: 1px solid var(--miku-border);
}

/* Embedded */
.c-card--embedded {
  background-color: var(--miku-bg-secondary);
}

/* Hoverable */
.c-card--hoverable {
  box-shadow: 0 2px 8px var(--miku-shadow);
}

.c-card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Header */
.c-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid transparent;
}

.c-card__header-main {
  flex: 1;
  min-width: 0;
}

.c-card__title {
  font-size: 1.1em;
  font-weight: 600;
  color: var(--miku-text);
  line-height: 1.4;
}

.c-card__header-extra {
  flex-shrink: 0;
}

/* Content */
.c-card__content {
  flex: 1;
  color: var(--miku-text);
}

.c-card__content--segmented {
  border-top: 1px solid var(--miku-border);
}

/* Footer */
.c-card__footer {
  color: var(--miku-text-secondary);
}

.c-card__footer--segmented {
  border-top: 1px solid var(--miku-border);
}

/* Action */
.c-card__action {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.c-card__action--segmented {
  border-top: 1px solid var(--miku-border);
}

/* 暗色模式阴影调整 */
@media (prefers-color-scheme: dark) {
  .c-card--hoverable {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .c-card--hoverable:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

.dark-mode .c-card--hoverable {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.dark-mode .c-card--hoverable:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>
