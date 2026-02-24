<template>
  <n-card
    :title="title"
    :size="size"
    :hoverable="hoverable"
    :bordered="bordered"
    :segmented="segmented"
    :embedded="embedded"
    class="carrick-card"
  >
    <template #header-extra v-if="$slots['header-extra']">
      <slot name="header-extra" />
    </template>
    <slot />
    
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
    <template #action v-if="$slots.action">
      <slot name="action" />
    </template>
  </n-card>
</template>

<script setup>
import { NCard } from 'naive-ui'

defineProps({
  title: String,
  size: {
    type: String,
    default: 'medium'
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: false
  },
  segmented: {
    type: [Boolean, Object],
    default: false
  },
  embedded: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.carrick-card {
  transition: all 0.2s ease;
  background: var(--miku-bg);
  color: var(--miku-text);
  border-color: var(--miku-border);
}

.carrick-card :deep(.n-card__content) {
  color: var(--miku-text);
}

.carrick-card :deep(.n-card__header) {
  color: var(--miku-text);
}

.carrick-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--miku-shadow);
}
</style>