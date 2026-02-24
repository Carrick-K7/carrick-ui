<template>
  <div
    class="c-progress"
    :class="[
      `c-progress--${type}`,
      `c-progress--${size}`,
      `c-progress--${status}`,
      { 'c-progress--indeterminate': indeterminate }
    ]"
  >
    <!-- 线性进度条 -->
    <template v-if="type === 'line'">
      <div class="c-progress__line-wrapper">
        <div class="c-progress__line-bg" :style="lineBgStyle">
          <div
            class="c-progress__line-fill"
            :style="lineFillStyle"
            :class="{ 'c-progress__line-fill--animated': indeterminate }"
          />
        </div>
        <div v-if="showText && !indeterminate" class="c-progress__text">
          <slot :percentage="percentage">{{ format ? format(percentage) : `${percentage}%` }}</slot>
        </div>
      </div>
    </template>

    <!-- 圆形进度条 -->
    <template v-else-if="type === 'circle'">
      <div class="c-progress__circle-wrapper" :style="circleWrapperStyle">
        <svg :width="circleSize" :height="circleSize" viewBox="0 0 100 100">
          <circle
            class="c-progress__circle-track"
            cx="50"
            cy="50"
            :r="circleRadius"
            fill="none"
            :stroke-width="strokeWidthPercent"
          />
          <circle
            class="c-progress__circle-fill"
            cx="50"
            cy="50"
            :r="circleRadius"
            fill="none"
            :stroke-width="strokeWidthPercent"
            :stroke-dasharray="circleDasharray"
            :stroke-dashoffset="circleDashoffset"
            stroke-linecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        <div v-if="showText" class="c-progress__circle-text">
          <slot :percentage="percentage">{{ format ? format(percentage) : `${percentage}%` }}</slot>
        </div>
      </div>
    </template>

    <!-- 仪表盘进度条 -->
    <template v-else-if="type === 'dashboard'">
      <div class="c-progress__circle-wrapper" :style="circleWrapperStyle">
        <svg :width="circleSize" :height="circleSize * 0.65" viewBox="0 0 100 65">
          <path
            class="c-progress__circle-track"
            :d="dashboardPath"
            fill="none"
            :stroke-width="strokeWidthPercent"
          />
          <path
            class="c-progress__circle-fill"
            :d="dashboardPath"
            fill="none"
            :stroke-width="strokeWidthPercent"
            :stroke-dasharray="dashboardDasharray"
            :stroke-dashoffset="dashboardDashoffset"
            stroke-linecap="round"
          />
        </svg>
        
        <div v-if="showText" class="c-progress__circle-text c-progress__circle-text--dashboard">
          <slot :percentage="percentage">{{ format ? format(percentage) : `${percentage}%` }}</slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
    validator(value) {
      return value >= 0 && value <= 100
    }
  },
  type: {
    type: String,
    default: 'line',
    validator(value) {
      return ['line', 'circle', 'dashboard'].includes(value)
    }
  },
  status: {
    type: String,
    default: 'active',
    validator(value) {
      return ['active', 'success', 'exception', 'warning'].includes(value)
    }
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  showText: {
    type: Boolean,
    default: true
  },
  format: {
    type: Function,
    default: null
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['change', 'complete'])

// 尺寸映射
const sizeMap = {
  small: { line: 4, circle: 60 },
  medium: { line: 6, circle: 100 },
  large: { line: 8, circle: 140 }
}

const actualStrokeWidth = computed(() => {
  return props.strokeWidth || sizeMap[props.size].line
})

// 状态颜色 - iOS 标准色 + 初音主色
const statusColor = computed(() => {
  if (props.color) return props.color
  
  const colors = {
    active: '#39C5BB',
    success: '#34C759',
    exception: '#FF3B30',
    warning: '#FF9500'
  }
  return colors[props.status]
})

// 线性进度条样式
const lineBgStyle = computed(() => ({
  height: `${actualStrokeWidth.value}px`,
  borderRadius: `${actualStrokeWidth.value / 2}px`,
  backgroundColor: 'var(--miku-bg-tertiary)'
}))

const lineFillStyle = computed(() => ({
  width: `${props.percentage}%`,
  backgroundColor: statusColor.value,
  borderRadius: `${actualStrokeWidth.value / 2}px`
}))

// 圆形进度条计算
const circleSize = computed(() => sizeMap[props.size].circle)
const circleRadius = computed(() => 50 - props.strokeWidth / 2)
const strokeWidthPercent = computed(() => (props.strokeWidth / circleSize.value) * 100)
const circleCircumference = computed(() => 2 * Math.PI * circleRadius.value)
const circleDasharray = computed(() => circleCircumference.value)
const circleDashoffset = computed(() => {
  return circleCircumference.value - (props.percentage / 100) * circleCircumference.value
})

const circleWrapperStyle = computed(() => ({
  width: `${circleSize.value}px`,
  height: props.type === 'dashboard' ? `${circleSize.value * 0.65}px` : `${circleSize.value}px`,
  '--progress-color': statusColor.value
}))

// 仪表盘路径
const dashboardPath = 'M 10 50 A 40 40 0 1 1 90 50'
const dashboardLength = 220 // 近似弧长
const dashboardDasharray = dashboardLength
const dashboardDashoffset = computed(() => {
  return dashboardLength - (props.percentage / 100) * dashboardLength
})

// 监听进度变化
watch(() => props.percentage, (newVal, oldVal) => {
  emit('change', newVal)
  if (newVal === 100 && oldVal !== 100) {
    emit('complete')
  }
})
</script>

<style scoped>
.c-progress {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 线性进度条样式 */
.c-progress--line {
  width: 100%;
}

.c-progress__line-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.c-progress__line-bg {
  flex: 1;
  overflow: hidden;
  background-color: var(--miku-bg-tertiary);
}

.c-progress__line-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.c-progress__line-fill--animated {
  width: 30% !important;
  animation: indeterminate 1.5s ease-in-out infinite;
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(300%);
  }
}

.c-progress__text {
  font-size: 14px;
  color: var(--miku-text);
  min-width: 40px;
  text-align: right;
  white-space: nowrap;
}

/* 圆形进度条样式 */
.c-progress__circle-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.c-progress__circle-track {
  stroke: var(--miku-bg-tertiary);
}

.c-progress__circle-fill {
  stroke: var(--progress-color, var(--miku-primary));
  transition: stroke-dashoffset 0.3s ease;
}

.c-progress__circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: var(--miku-text);
  font-weight: 500;
}

.c-progress__circle-text--dashboard {
  top: 65%;
}

/* 尺寸调整 */
.c-progress--small .c-progress__text {
  font-size: 12px;
}

.c-progress--large .c-progress__text {
  font-size: 16px;
}

.c-progress--large .c-progress__circle-text {
  font-size: 20px;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .c-progress__text,
  .c-progress__circle-text {
    color: var(--miku-text);
  }
}

:global(.dark-mode) .c-progress__text,
:global(.dark-mode) .c-progress__circle-text {
  color: var(--miku-text);
}

/* 移动端优化 */
@media (pointer: coarse) {
  .c-progress__text {
    font-size: 16px;
  }
  
  .c-progress__circle-text {
    font-size: 16px;
  }
  
  .c-progress--large .c-progress__circle-text {
    font-size: 22px;
  }
}
</style>
