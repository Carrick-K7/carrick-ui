<template>
  <div class="c-empty" @click="handleClick">
    <div class="c-empty__image" :style="imageStyle">
      <slot name="image">
        <!-- Default: Box -->
        <Package 
          v-if="imageType === 'default'"
          :size="imageSize" 
          class="c-empty__icon c-empty__icon--default"
          stroke-width="1"
        />
        
        <!-- Search -->
        <Search
          v-else-if="imageType === 'search'"
          :size="imageSize"
          class="c-empty__icon c-empty__icon--search"
          stroke-width="1"
        />
        
        <!-- Error -->
        <AlertCircle
          v-else-if="imageType === 'error'"
          :size="imageSize"
          class="c-empty__icon c-empty__icon--error"
          stroke-width="1"
        />
        
        <!-- Network -->
        <WifiOff
          v-else-if="imageType === 'network'"
          :size="imageSize"
          class="c-empty__icon c-empty__icon--warning"
          stroke-width="1"
        />
        
        <!-- 403 Forbidden -->
        <ShieldAlert
          v-else-if="imageType === '403'"
          :size="imageSize"
          class="c-empty__icon c-empty__icon--error"
          stroke-width="1"
        />
        
        <!-- 404 Not Found -->
        <FileX
          v-else-if="imageType === '404'"
          :size="imageSize"
          class="c-empty__icon c-empty__icon--default"
          stroke-width="1"
        />
        
        <!-- 500 Server Error -->
        <ServerCrash
          v-else-if="imageType === '500'"
          :size="imageSize"
          class="c-empty__icon c-empty__icon--error"
          stroke-width="1"
        />
        
        <!-- Custom Image -->
        <img
          v-else
          :src="image"
          :style="{ width: `${imageSize}px`, height: 'auto' }"
          alt="empty"
        />
      </slot>
    </div>
    
    <div class="c-empty__description">
      <slot name="description">{{ description }}</slot>
    </div>
    
    <div v-if="$slots.default" class="c-empty__footer">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Package, Search, AlertCircle, WifiOff, ShieldAlert, FileX, ServerCrash } from 'lucide-vue-next'

const props = defineProps({
  description: {
    type: String,
    default: '暂无数据'
  },
  image: {
    type: String,
    default: ''
  },
  imageSize: {
    type: Number,
    default: 120
  }
})

const emit = defineEmits(['click'])

const imageType = computed(() => {
  const presets = ['default', 'search', 'error', 'network', '403', '404', '500']
  if (presets.includes(props.image)) {
    return props.image
  }
  return props.image ? 'custom' : 'default'
})

const imageStyle = computed(() => ({
  width: `${props.imageSize}px`,
  height: `${props.imageSize * 0.75}px`
}))

const handleClick = (event) => {
  emit('click', event)
}
</script>

<style scoped>
.c-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  text-align: center;
}

.c-empty__image {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  opacity: 0.8;
}

.c-empty__icon {
  opacity: 0.5;
}

.c-empty__icon--default {
  color: var(--miku-text-muted);
}

.c-empty__icon--search {
  color: var(--miku-info);
}

.c-empty__icon--error {
  color: var(--miku-error);
}

.c-empty__icon--warning {
  color: var(--miku-warning);
}

.c-empty__description {
  font-size: 14px;
  color: var(--miku-text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.c-empty__footer {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .c-empty__image {
    opacity: 0.7;
  }
  
  .c-empty__description {
    color: var(--miku-text-secondary);
  }
}

:global(.dark-mode) .c-empty__image {
  opacity: 0.7;
}

:global(.dark-mode) .c-empty__description {
  color: var(--miku-text-secondary);
}

/* 移动端适配 */
@media (pointer: coarse) {
  .c-empty {
    padding: 48px 20px;
  }
  
  .c-empty__description {
    font-size: 16px;
  }
  
  .c-empty__footer {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
  }
  
  .c-empty__footer :deep(*) {
    width: 100%;
  }
}
</style>
