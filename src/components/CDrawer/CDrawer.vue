<template>
  <Teleport to="body">
    <!-- 遮罩层 -->
    <Transition name="fade-overlay">
      <div 
        v-if="modelValue" 
        class="drawer-overlay" 
        @click="handleOverlayClick"
      ></div>
    </Transition>

    <!-- 抽屉本体 -->
    <Transition name="drawer-slide">
      <div 
        v-if="modelValue" 
        class="bottom-drawer"
        :style="drawerStyle"
      >
        <!-- 头部 -->
        <div v-if="showHeader" class="drawer-header">
          <span class="drawer-title">{{ title }}</span>
          <button 
            v-if="showClose" 
            class="drawer-close" 
            @click="close"
            aria-label="关闭"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- 内容 -->
        <div class="drawer-content">
          <slot></slot>
        </div>

        <!-- 底部安全区域 -->
        <div class="drawer-safe-area"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
/**
 * CDrawer - 通用底部抽屉组件
 * 
 * 特性:
 * - 从底部滑入动画
 * - 支持标题 + 关闭按钮
 * - 支持点击遮罩关闭
 * - 可自定义最大高度
 * - 自动适配底部安全区域（iPhone 横条）
 */
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  /** v-model 绑定值 */
  modelValue: {
    type: Boolean,
    default: false
  },
  /** 抽屉标题 */
  title: {
    type: String,
    default: ''
  },
  /** 是否显示头部 */
  showHeader: {
    type: Boolean,
    default: true
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true
  },
  /** 点击遮罩是否关闭 */
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  /** 最大高度（CSS 值） */
  maxHeight: {
    type: String,
    default: 'calc(100vh - 60px)'
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const drawerStyle = computed(() => ({
  maxHeight: props.maxHeight
}))

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}
</script>

<style scoped>
/* 遮罩层 */
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(0, 0, 0, 0.5);
}

/* 抽屉本体 */
.bottom-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 160;
  background: var(--miku-bg, #ffffff);
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.dark .bottom-drawer {
  background: var(--miku-bg, #1a1a2e);
}

/* 头部 */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--miku-border, #e5e7eb);
  flex-shrink: 0;
}

.dark .drawer-header {
  border-bottom-color: var(--miku-border, #2d2d44);
}

.drawer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--miku-primary, #39c5bb);
}

.drawer-close {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: var(--miku-text-muted, #6b7280);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.drawer-close:hover {
  color: var(--miku-primary, #39c5bb);
  background: var(--miku-bg-secondary, #f3f4f6);
}

/* 内容区域 */
.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  /* 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #39c5bb var(--miku-bg-secondary, #f3f4f6);
}

.drawer-content::-webkit-scrollbar {
  width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
  background: var(--miku-bg-secondary, #f3f4f6);
  border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb {
  background: #39c5bb;
  border-radius: 3px;
}

/* 底部安全区域 */
.drawer-safe-area {
  height: 0;
  flex-shrink: 0;
}

@supports (padding: max(0px)) {
  .drawer-safe-area {
    height: max(0px, env(safe-area-inset-bottom));
  }
}

/* 动画 */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s ease-out;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateY(100%);
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>
