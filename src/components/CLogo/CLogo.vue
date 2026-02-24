<template>
  <div class="c-logo" :class="`c-logo--${size}`">
    <span class="c-logo__brand">Carrick</span>
    <span class="c-logo__project">{{ project }}</span>
  </div>
</template>

<script setup>
defineProps({
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
  }
})
</script>

<style scoped>
.c-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.c-logo__brand {
  color: #39C5BB;
  font-family: 'Cascadia Code', monospace;
  font-weight: 700;
}

.c-logo__project {
  color: #666;
  font-family: 'HarmonyOS Sans', -apple-system, sans-serif;
  font-weight: 500;
}

/* 尺寸定义 */
.c-logo--sm .c-logo__brand {
  font-size: 26px;
}

.c-logo--sm .c-logo__project {
  font-size: 15px;
}

.c-logo--md .c-logo__brand {
  font-size: 32px;
}

.c-logo--md .c-logo__project {
  font-size: 20px;
}

.c-logo--lg .c-logo__brand {
  font-size: 40px;
}

.c-logo--lg .c-logo__project {
  font-size: 26px;
}
</style>
