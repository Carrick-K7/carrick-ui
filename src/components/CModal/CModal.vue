<template>
  <n-modal
    :show="show"
    :title="title"
    :size="size"
    :preset="preset"
    :mask-closable="maskClosable"
    :close-on-esc="closeOnEsc"
    :show-icon="showIcon"
    @update:show="$emit('update:show', $event)"
    @positive-click="$emit('positive-click')"
    @negative-click="$emit('negative-click')"
  >
    <slot />
    
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
    
    <template #action v-if="$slots.action">
      <slot name="action" />
    </template>
  </n-modal>
</template>

<script setup>
import { NModal } from 'naive-ui'

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: String,
  size: {
    type: String,
    default: 'medium'
  },
  preset: {
    type: String,
    default: 'dialog'
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update:show', 'positive-click', 'negative-click'])
</script>