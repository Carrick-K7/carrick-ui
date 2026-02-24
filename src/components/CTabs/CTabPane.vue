<template>
  <div
    v-show="isActive"
    class="c-tab-pane"
    :class="{ 'c-tab-pane--active': isActive }"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  name: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

// 注入 tabs 上下文
const tabs = inject('tabs', null)

const isActive = computed(() => {
  return tabs?.activeName?.value === props.name
})

const shouldRender = computed(() => {
  if (tabs?.destroyInactive) {
    return isActive.value
  }
  return true
})

// 注册到父组件
onMounted(() => {
  tabs?.registerTab?.({
    name: props.name,
    label: props.label,
    disabled: props.disabled,
    closable: props.closable
  })
})

// 更新标签信息
watch(() => [props.label, props.disabled, props.closable], () => {
  tabs?.unregisterTab?.(props.name)
  tabs?.registerTab?.({
    name: props.name,
    label: props.label,
    disabled: props.disabled,
    closable: props.closable
  })
})

// 卸载时注销
onUnmounted(() => {
  tabs?.unregisterTab?.(props.name)
})
</script>

<style scoped>
.c-tab-pane {
  width: 100%;
}

.c-tab-pane--active {
  animation: fade-in 0.3s ease;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
