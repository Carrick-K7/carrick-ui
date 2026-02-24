<template>
  <n-button
    :type="type"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :ghost="ghost"
    :text="text"
    :tag="tag"
    :color="carrickColor"
    @click="$emit('click')"
  >
    <slot />
  </n-button>
</template>

<script setup>
import { computed } from 'vue'
import { NButton } from 'naive-ui'

defineEmits(['click'])

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: Boolean,
  loading: Boolean,
  ghost: Boolean,
  text: Boolean,
  tag: {
    type: String,
    default: 'button'
  },
  // Carrick 品牌色覆盖
  useCarrickColor: {
    type: Boolean,
    default: true
  }
})

// 使用 Carrick 品牌色 #39C5BB
const carrickColor = computed(() => {
  return props.useCarrickColor ? '#39C5BB' : undefined
})
</script>