<template>
  <div
    class="c-tabs"
    :class="[
      `c-tabs--${type}`,
      `c-tabs--${position}`,
      `c-tabs--${size}`,
      { 'c-tabs--centered': centered }
    ]"
  >
    <div class="c-tabs__nav-wrapper">
      <div class="c-tabs__nav" role="tablist">
        <div
          v-for="tab in tabs"
          :key="tab.name"
          class="c-tabs__tab"
          :class="{
            'c-tabs__tab--active': modelValue === tab.name,
            'c-tabs__tab--disabled': tab.disabled,
            'c-tabs__tab--closable': tab.closable
          }"
          :style="tabStyle"
          role="tab"
          :aria-selected="modelValue === tab.name"
          :aria-disabled="tab.disabled"
          @click="handleTabClick(tab)"
        >
          <span class="c-tabs__tab-label">
            <slot :name="`tab-${tab.name}`">{{ tab.label }}</slot>
          </span>
          
          <span
            v-if="tab.closable"
            class="c-tabs__tab-close"
            @click.stop="handleClose(tab)"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </span>
        </div>
        
        <!-- 线条指示器 -->
        <div
          v-if="type === 'line'"
          class="c-tabs__ink-bar"
          :style="inkBarStyle"
        />
      </div>
      
      <div v-if="$slots.extra" class="c-tabs__extra">
        <slot name="extra" />
      </div>
    </div>
    
    <div class="c-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, provide, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'line',
    validator(value) {
      return ['line', 'card', 'segment'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  position: {
    type: String,
    default: 'top',
    validator(value) {
      return ['top', 'left', 'right', 'bottom'].includes(value)
    }
  },
  animated: {
    type: Boolean,
    default: true
  },
  centered: {
    type: Boolean,
    default: false
  },
  destroyInactive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'tabClick', 'tabClose'])

// 存储子标签信息
const tabs = ref([])
const activeTabIndex = computed(() => {
  return tabs.value.findIndex(tab => tab.name === props.modelValue)
})

// 注册标签
const registerTab = (tabInfo) => {
  if (!tabs.value.find(t => t.name === tabInfo.name)) {
    tabs.value.push(tabInfo)
  }
}

// 注销标签
const unregisterTab = (name) => {
  const index = tabs.value.findIndex(t => t.name === name)
  if (index > -1) {
    tabs.value.splice(index, 1)
  }
}

// 提供给子组件
provide('tabs', {
  registerTab,
  unregisterTab,
  activeName: computed(() => props.modelValue),
  destroyInactive: props.destroyInactive,
  animated: props.animated
})

// 尺寸配置
const sizeConfig = {
  small: { height: 32, fontSize: 13, padding: '0 12px' },
  medium: { height: 40, fontSize: 14, padding: '0 16px' },
  large: { height: 48, fontSize: 15, padding: '0 20px' }
}

const currentSize = computed(() => sizeConfig[props.size])

// 标签样式
const tabStyle = computed(() => ({
  height: `${currentSize.value.height}px`,
  fontSize: `${currentSize.value.fontSize}px`,
  padding: currentSize.value.padding
}))

// 线条指示器样式
const inkBarStyle = ref({
  transform: 'translateX(0)',
  width: '0px'
})

// 更新线条指示器位置
const updateInkBar = () => {
  if (props.type !== 'line') return
  
  nextTick(() => {
    const navEl = document.querySelector('.c-tabs__nav')
    const activeTabEl = navEl?.querySelector('.c-tabs__tab--active')
    
    if (activeTabEl && navEl) {
      const navRect = navEl.getBoundingClientRect()
      const tabRect = activeTabEl.getBoundingClientRect()
      
      inkBarStyle.value = {
        transform: `translateX(${tabRect.left - navRect.left}px)`,
        width: `${tabRect.width}px`
      }
    }
  })
}

// 处理标签点击
const handleTabClick = (tab) => {
  if (tab.disabled) return
  
  emit('update:modelValue', tab.name)
  emit('change', tab.name)
  emit('tabClick', tab.name)
  
  updateInkBar()
}

// 处理关闭
const handleClose = (tab) => {
  emit('tabClose', tab.name)
}

// 监听值变化
watch(() => props.modelValue, () => {
  updateInkBar()
}, { immediate: true })

onMounted(() => {
  updateInkBar()
})
</script>

<style scoped>
.c-tabs {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.c-tabs__nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--miku-border);
}

.c-tabs__nav {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

.c-tabs__nav::-webkit-scrollbar {
  display: none;
}

.c-tabs__tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  color: var(--miku-text-secondary);
  transition: color 0.3s ease;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

.c-tabs__tab:hover:not(.c-tabs__tab--disabled) {
  color: var(--miku-text);
}

.c-tabs__tab--active {
  color: var(--miku-primary, #39C5BB);
  font-weight: 500;
}

.c-tabs__tab--disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.c-tabs__tab-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  opacity: 0.5;
  transition: all 0.2s ease;
}

.c-tabs__tab-close:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.08);
}

.c-tabs__ink-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: var(--miku-primary, #39C5BB);
  transition: transform 0.3s ease, width 0.3s ease;
  border-radius: 1px;
}

.c-tabs__extra {
  margin-left: 16px;
  flex-shrink: 0;
}

.c-tabs__content {
  padding-top: 16px;
}

/* 卡片类型 */
.c-tabs--card .c-tabs__nav-wrapper {
  border-bottom: none;
  background-color: var(--miku-bg-secondary);
  border-radius: 8px;
  padding: 4px;
}

.c-tabs--card .c-tabs__tab {
  border-radius: 6px;
  margin-right: 2px;
}

.c-tabs--card .c-tabs__tab--active {
  background-color: var(--miku-bg);
  box-shadow: 0 2px 4px var(--miku-shadow);
}

/* 分段控制器类型 */
.c-tabs--segment .c-tabs__nav-wrapper {
  border-bottom: none;
  background-color: var(--miku-bg-tertiary);
  border-radius: 8px;
  padding: 3px;
}

.c-tabs--segment .c-tabs__nav {
  width: 100%;
}

.c-tabs--segment .c-tabs__tab {
  flex: 1;
  justify-content: center;
  border-radius: 6px;
  margin: 0 2px;
}

.c-tabs--segment .c-tabs__tab--active {
  background-color: var(--miku-bg);
  box-shadow: 0 1px 3px var(--miku-shadow);
}

/* 居中 */
.c-tabs--centered .c-tabs__nav {
  justify-content: center;
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .c-tabs__tab {
    color: var(--miku-text-secondary);
  }
  
  .c-tabs__tab:hover:not(.c-tabs__tab--disabled) {
    color: var(--miku-text);
  }
  
  .c-tabs--card .c-tabs__nav-wrapper,
  .c-tabs--segment .c-tabs__nav-wrapper {
    background-color: var(--miku-bg-secondary);
  }
  
  .c-tabs--card .c-tabs__tab--active,
  .c-tabs--segment .c-tabs__tab--active {
    background-color: var(--miku-bg-tertiary);
  }
  
  .c-tabs__tab-close:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

:global(.dark-mode) .c-tabs__tab {
  color: var(--miku-text-secondary);
}

:global(.dark-mode) .c-tabs__tab:hover:not(.c-tabs__tab--disabled) {
  color: var(--miku-text);
}

:global(.dark-mode) .c-tabs--card .c-tabs__nav-wrapper,
:global(.dark-mode) .c-tabs--segment .c-tabs__nav-wrapper {
  background-color: var(--miku-bg-secondary);
}

:global(.dark-mode) .c-tabs--card .c-tabs__tab--active,
:global(.dark-mode) .c-tabs--segment .c-tabs__tab--active {
  background-color: var(--miku-bg-tertiary);
}

/* 移动端触摸优化 */
@media (pointer: coarse) {
  .c-tabs__tab {
    min-width: 44px;
    min-height: 44px;
    justify-content: center;
  }
  
  .c-tabs__tab-close {
    width: 32px;
    height: 32px;
  }
  
  .c-tabs__ink-bar {
    height: 3px;
  }
}
</style>
