<template>
  <div
    class="c-loading-wrapper"
    :class="{ 'c-loading-wrapper--fullscreen': fullscreen }"
  >
    <slot />
    
    <transition name="c-loading-fade"
    @after-leave="handleAfterLeave"
  >
      <div
        v-if="shouldShow"
        class="c-loading"
        :class="[
          `c-loading--${type}`,
          `c-loading--${size}`,
          { 'c-loading--fullscreen': fullscreen, 'c-loading--with-mask': mask }
        ]"
      >
        <div class="c-loading__content">
          <div class="c-loading__indicator">
            <slot name="indicator">
              <!-- Spinner -->
              <svg
                v-if="type === 'spinner'"
                class="c-loading__spinner"
                :width="indicatorSize"
                :height="indicatorSize"
                viewBox="0 0 50 50"
              >
                <circle
                  class="c-loading__spinner-track"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="var(--miku-bg-tertiary)"
                  stroke-width="4"
                />
                <circle
                  class="c-loading__spinner-path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  :stroke="indicatorColor"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-dasharray="80 120"
                  transform="rotate(-90 25 25)"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
              
              <!-- Dots -->
              <div
                v-else-if="type === 'dots'"
                class="c-loading__dots"
                :style="{ gap: `${dotGap}px` }"
              >
                <span
                  v-for="i in 3"
                  :key="i"
                  class="c-loading__dot"
                  :style="dotStyle"
                />
              </div>
              
              <!-- Wave -->
              <div
                v-else-if="type === 'wave'"
                class="c-loading__wave"
                :style="{ gap: `${waveGap}px` }"
              >
                <span
                  v-for="i in 5"
                  :key="i"
                  class="c-loading__wave-bar"
                  :style="waveStyle"
                />
              </div>
              
              <!-- Pulse -->
              <div
                v-else-if="type === 'pulse'"
                class="c-loading__pulse"
                :style="{ width: `${indicatorSize}px`, height: `${indicatorSize}px` }"
              >
                <span
                  v-for="i in 3"
                  :key="i"
                  class="c-loading__pulse-ring"
                  :style="pulseStyle"
                />
              </div>
            </slot>
          </div>
          
          <div v-if="text || $slots.text" class="c-loading__text">
            <slot name="text">{{ text }}</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'spinner',
    validator(value) {
      return ['spinner', 'dots', 'wave', 'pulse'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  color: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: true
  },
  delay: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:loading', 'afterLeave'])

// 尺寸配置
const sizeConfig = {
  small: { spinner: 20, dots: 6, wave: 4, text: 12 },
  medium: { spinner: 32, dots: 10, wave: 6, text: 14 },
  large: { spinner: 48, dots: 14, wave: 8, text: 16 }
}

const currentSize = computed(() => sizeConfig[props.size])
const indicatorSize = computed(() => currentSize.value[props.type] || currentSize.value.spinner)
const indicatorColor = computed(() => props.color || 'var(--miku-primary, #39C5BB)')

// 延迟显示逻辑
const shouldShow = ref(props.loading)
let delayTimer = null

watch(() => props.loading, (newVal) => {
  if (delayTimer) {
    clearTimeout(delayTimer)
    delayTimer = null
  }
  
  if (newVal) {
    if (props.delay > 0) {
      delayTimer = setTimeout(() => {
        shouldShow.value = true
      }, props.delay)
    } else {
      shouldShow.value = true
    }
  } else {
    shouldShow.value = false
  }
}, { immediate: true })

// Dots 样式
const dotGap = computed(() => currentSize.value.dots * 0.3)
const dotStyle = computed(() => ({
  width: `${currentSize.value.dots}px`,
  height: `${currentSize.value.dots}px`,
  backgroundColor: indicatorColor.value
}))

// Wave 样式
const waveGap = computed(() => currentSize.value.wave * 0.4)
const waveStyle = computed(() => ({
  width: `${currentSize.value.wave}px`,
  height: `${currentSize.value.wave * 4}px`,
  backgroundColor: indicatorColor.value
}))

// Pulse 样式
const pulseStyle = computed(() => ({
  borderColor: indicatorColor.value
}))

const handleAfterLeave = () => {
  emit('afterLeave')
}
</script>

<style scoped>
.c-loading-wrapper {
  position: relative;
}

.c-loading-wrapper--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.c-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.c-loading--with-mask {
  background-color: rgba(255, 255, 255, 0.8);
}

.c-loading--fullscreen {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.9);
}

.c-loading__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.c-loading__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-loading__text {
  font-size: 14px;
  color: var(--miku-text-secondary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 尺寸调整 */
.c-loading--small .c-loading__text {
  font-size: 12px;
}

.c-loading--large .c-loading__text {
  font-size: 16px;
}

/* Dots 动画 */
.c-loading__dots {
  display: flex;
  align-items: center;
}

.c-loading__dot {
  border-radius: 50%;
  animation: loading-dots 1.4s ease-in-out infinite both;
}

.c-loading__dot:nth-child(1) {
  animation-delay: -0.32s;
}

.c-loading__dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading-dots {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Wave 动画 */
.c-loading__wave {
  display: flex;
  align-items: center;
  height: 40px;
}

.c-loading__wave-bar {
  border-radius: 4px;
  animation: loading-wave 1.2s ease-in-out infinite;
}

.c-loading__wave-bar:nth-child(1) { animation-delay: -1.1s; }
.c-loading__wave-bar:nth-child(2) { animation-delay: -1.0s; }
.c-loading__wave-bar:nth-child(3) { animation-delay: -0.9s; }
.c-loading__wave-bar:nth-child(4) { animation-delay: -0.8s; }
.c-loading__wave-bar:nth-child(5) { animation-delay: -0.7s; }

@keyframes loading-wave {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}

/* Pulse 动画 */
.c-loading__pulse {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-loading__pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid;
  border-radius: 50%;
  opacity: 0;
  animation: loading-pulse 2s ease-out infinite;
}

.c-loading__pulse-ring:nth-child(1) { animation-delay: 0s; }
.c-loading__pulse-ring:nth-child(2) { animation-delay: 0.4s; }
.c-loading__pulse-ring:nth-child(3) { animation-delay: 0.8s; }

@keyframes loading-pulse {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* 过渡动画 */
.c-loading-fade-enter-active,
.c-loading-fade-leave-active {
  transition: opacity 0.3s ease;
}

.c-loading-fade-enter-from,
.c-loading-fade-leave-to {
  opacity: 0;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .c-loading--with-mask {
    background-color: rgba(26, 26, 26, 0.8);
  }
  
  .c-loading--fullscreen {
    background-color: rgba(26, 26, 26, 0.95);
  }
  
  .c-loading__text {
    color: var(--miku-text-secondary);
  }
}

:global(.dark-mode) .c-loading--with-mask {
  background-color: rgba(26, 26, 26, 0.8);
}

:global(.dark-mode) .c-loading--fullscreen {
  background-color: rgba(26, 26, 26, 0.95);
}

:global(.dark-mode) .c-loading__text {
  color: var(--miku-text-secondary);
}

/* 移动端适配 */
@media (pointer: coarse) {
  .c-loading__text {
    font-size: 16px;
  }
  
  .c-loading--small .c-loading__text {
    font-size: 14px;
  }
  
  .c-loading--large .c-loading__text {
    font-size: 18px;
  }
}
</style>
