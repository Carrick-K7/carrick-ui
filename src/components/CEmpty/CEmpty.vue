<template>
  <div class="c-empty" @click="handleClick">
    <div class="c-empty__image" :style="imageStyle">
      <slot name="image">
        <svg
          v-if="imageType === 'default'"
          :width="imageSize" 
          :height="imageSize * 0.75"
          viewBox="0 0 120 90"
          fill="none"
        >
          <rect x="10" y="15" width="100" height="70" rx="8" fill="var(--miku-bg-tertiary)"/>
          <rect x="25" y="35" width="40" height="6" rx="3" fill="var(--miku-border)"/>
          <rect x="25" y="48" width="30" height="6" rx="3" fill="var(--miku-border)"/>
          <circle cx="90" cy="55" r="15" fill="var(--miku-primary)" opacity="0.2"/>
          <path d="M85 55L90 60L100 50" stroke="var(--miku-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        <svg
          v-else-if="imageType === 'search'"
          :width="imageSize" 
          :height="imageSize * 0.75"
          viewBox="0 0 120 90"
          fill="none"
        >
          <circle cx="55" cy="40" r="25" stroke="var(--miku-border)" stroke-width="4" fill="none"/>
          <path d="M75 55L95 75" stroke="var(--miku-border)" stroke-width="4" stroke-linecap="round"/>
          <circle cx="55" cy="40" r="15" stroke="var(--miku-primary)" stroke-width="3" fill="none" opacity="0.5"/>
        </svg>
        
        <svg
          v-else-if="imageType === 'error'"
          :width="imageSize" 
          :height="imageSize * 0.75"
          viewBox="0 0 120 90"
          fill="none"
        >
          <circle cx="60" cy="45" r="30" stroke="#FF3B30" stroke-width="3" fill="none" opacity="0.3"/>
          <path d="M48 33L72 57M72 33L48 57" stroke="#FF3B30" stroke-width="4" stroke-linecap="round"/>
        </svg>
        
        <svg
          v-else-if="imageType === 'network'"
          :width="imageSize" 
          :height="imageSize * 0.75"
          viewBox="0 0 120 90"
          fill="none"
        >
          <rect x="25" y="25" width="70" height="45" rx="6" stroke="var(--miku-border)" stroke-width="3" fill="none"/>
          <path d="M40 45h15M55 45l-8 12M55 45l8 12" stroke="#FF9500" stroke-width="3" stroke-linecap="round"/>
          <circle cx="75" cy="40" r="3" fill="var(--miku-border)"/>
          <circle cx="85" cy="40" r="3" fill="var(--miku-border)"/>
        </svg>
        
        <svg
          v-else-if="imageType === '403'"
          :width="imageSize" 
          :height="imageSize * 0.75"
          viewBox="0 0 120 90"
          fill="none"
        >
          <rect x="35" y="20" width="50" height="50" rx="6" stroke="var(--miku-border)" stroke-width="3" fill="none"/>
          <circle cx="60" cy="38" r="6" fill="var(--miku-border)"/>
          <path d="M48 52c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="var(--miku-border)" stroke-width="3" stroke-linecap="round" fill="none"/>
          <path d="M30 35L40 25M90 35L80 25M30 55L40 65M90 55L80 65" stroke="#FF3B30" stroke-width="3" stroke-linecap="round"/>
        </svg>
        
        <svg
          v-else-if="imageType === '404'"
          :width="imageSize" 
          :height="imageSize * 0.75"
          viewBox="0 0 120 90"
          fill="none"
        >
          <rect x="30" y="20" width="60" height="50" rx="4" fill="var(--miku-bg-tertiary)"/>
          <rect x="40" y="30" width="40" height="4" rx="2" fill="var(--miku-border)"/>
          <rect x="40" y="40" width="30" height="4" rx="2" fill="var(--miku-border)"/>
          <text x="60" y="72" text-anchor="middle" fill="var(--miku-text-muted)" font-size="12" font-family="Arial">404</text>
          <circle cx="95" cy="25" r="18" fill="#FF3B30" opacity="0.1"/>
          <path d="M88 18L102 32M102 18L88 32" stroke="#FF3B30" stroke-width="3" stroke-linecap="round"/>
        </svg>
        
        <svg
          v-else-if="imageType === '500'"
          :width="imageSize" 
          :height="imageSize * 0.75"
          viewBox="0 0 120 90"
          fill="none"
        >
          <rect x="25" y="25" width="70" height="40" rx="4" fill="var(--miku-bg-tertiary)"/>
          <rect x="35" y="35" width="50" height="4" rx="2" fill="var(--miku-border)"/>
          <rect x="35" y="45" width="30" height="4" rx="2" fill="var(--miku-border)"/>
          <path d="M55 75l-5-10h10l-5 10z" fill="#FF3B30"/>
          <rect x="53" y="65" width="4" height="10" fill="#FF3B30"/>
        </svg>
        
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

.c-empty__image svg {
  max-width: 100%;
  max-height: 100%;
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
