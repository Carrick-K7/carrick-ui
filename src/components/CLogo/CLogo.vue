<template>
  <div class="c-logo" :class="`c-logo--${size}`">
    <!-- 初音主题 Logo 图标 -->
    <Music v-if="showIcon" class="c-logo__icon" :size="iconSize" />
    
    <span class="c-logo__brand">Carrick</span>
    <span class="c-logo__project">{{ project }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Music } from 'lucide-vue-next'

const props = defineProps({
  project: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    }
  },
  showIcon: {
    type: Boolean,
    default: false
  }
})

const iconSizeMap = {
  sm: 20,
  md: 24,
  lg: 32
}

const iconSize = computed(() => iconSizeMap[props.size])
</script>

<style scoped>
.c-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.c-logo__icon {
  color: var(--miku-primary);
  flex-shrink: 0;
}

.c-logo__brand {
  color: #39C5BB;
  font-family: 'Cascadia Code', monospace;
  font-weight: 700;
}

.c-logo__project {
  color: #666;
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  font-weight: 500;
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .c-logo__project {
    color: var(--miku-text-secondary);
  }
}

:global(.dark-mode) .c-logo__project {
  color: var(--miku-text-secondary);
}

/* 尺寸定义 */
.c-logo--sm .c-logo__icon {
  width: 20px;
  height: 20px;
}

.c-logo--sm .c-logo__brand {
  font-size: 20px;
}

.c-logo--sm .c-logo__project {
  font-size: 14px;
}

.c-logo--md .c-logo__icon {
  width: 24px;
  height: 24px;
}

.c-logo--md .c-logo__brand {
  font-size: 24px;
}

.c-logo--md .c-logo__project {
  font-size: 18px;
}

.c-logo--lg .c-logo__icon {
  width: 32px;
  height: 32px;
}

.c-logo--lg .c-logo__brand {
  font-size: 32px;
}

.c-logo--lg .c-logo__project {
  font-size: 24px;
}
</style>
