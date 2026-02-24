<template>
  <Teleport to="body">
    <Transition name="c-modal">
      <div
        v-if="show"
        class="c-modal-overlay"
        :class="{ 'c-modal-overlay--mask': mask }"
        @click="handleOverlayClick"
      >
        <div
          class="c-modal"
          :class="[
            `c-modal--${size}`,
            `c-modal--${preset}`,
            { 'c-modal--centered': centered }
          ]"
          @click.stop
        >
          <!-- Icon -->
          <div v-if="showIcon && iconComponent" class="c-modal__icon">
            <component :is="iconComponent" :size="32" :class="`c-modal__icon--${type}`" />
          </div>
          
          <!-- Header -->
          <div v-if="title || $slots.header" class="c-modal__header">
            <slot name="header">
              <h3 class="c-modal__title">{{ title }}</h3>
            </slot>
          </div>
          
          <!-- Close button -->
          <button
            v-if="closable"
            class="c-modal__close"
            type="button"
            @click="handleClose"
          >
            <X :size="20" />
          </button>
          
          <!-- Content -->
          <div class="c-modal__content">
            <slot>
              <p v-if="content" class="c-modal__text">{{ content }}</p>
            </slot>
          </div>
          
          <!-- Footer / Actions -->
          <div v-if="preset === 'dialog' || $slots.footer || $slots.action" class="c-modal__footer">
            <slot name="footer">
              <div v-if="preset === 'dialog'" class="c-modal__actions">
                <CButton
                  v-if="negativeText"
                  type="default"
                  size="medium"
                  @click="handleNegativeClick"
                >
                  {{ negativeText }}
                </CButton>
                
                <CButton
                  type="primary"
                  size="medium"
                  :loading="positiveLoading"
                  @click="handlePositiveClick"
                >
                  {{ positiveText }}
                </CButton>
              </div>
            </slot>
            
            <slot name="action" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-vue-next'
import CButton from '../CButton/CButton.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  preset: {
    type: String,
    default: 'dialog',
    validator(value) {
      return ['dialog', 'card', 'confirm'].includes(value)
    }
  },
  type: {
    type: String,
    default: 'default',
    validator(value) {
      return ['default', 'success', 'warning', 'error', 'info'].includes(value)
    }
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  closable: {
    type: Boolean,
    default: true
  },
  centered: {
    type: Boolean,
    default: true
  },
  mask: {
    type: Boolean,
    default: true
  },
  positiveText: {
    type: String,
    default: '确认'
  },
  negativeText: {
    type: String,
    default: '取消'
  },
  positiveLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:show', 'positive-click', 'negative-click', 'close', 'mask-click'])

// 图标映射
const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
  default: null
}

const iconComponent = computed(() => iconMap[props.type])

// 处理关闭
const handleClose = () => {
  emit('update:show', false)
  emit('close')
}

// 处理遮罩点击
const handleOverlayClick = () => {
  emit('mask-click')
  if (props.maskClosable) {
    handleClose()
  }
}

// 处理确认
const handlePositiveClick = () => {
  emit('positive-click')
}

// 处理取消
const handleNegativeClick = () => {
  emit('negative-click')
  handleClose()
}

// ESC 键关闭
const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.show && props.closeOnEsc) {
    handleClose()
  }
}

// 阻止背景滚动
watch(() => props.show, (newVal) => {
  if (typeof document !== 'undefined') {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.c-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  -webkit-overflow-scrolling: touch;
}

.c-modal-overlay--mask {
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
}

.c-modal {
  position: relative;
  background-color: var(--miku-card-bg);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  max-height: calc(100vh - 40px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: var(--font-sans);
}

/* Size variants */
.c-modal--small {
  width: 100%;
  max-width: 400px;
}

.c-modal--medium {
  width: 100%;
  max-width: 520px;
}

.c-modal--large {
  width: 100%;
  max-width: 720px;
}

/* Card preset */
.c-modal--card {
  max-height: calc(100vh - 40px);
}

/* Icon */
.c-modal__icon {
  display: flex;
  justify-content: center;
  padding-top: 32px;
  padding-bottom: 8px;
}

.c-modal__icon--success {
  color: var(--miku-success);
}

.c-modal__icon--warning {
  color: var(--miku-warning);
}

.c-modal__icon--error {
  color: var(--miku-error);
}

.c-modal__icon--info {
  color: var(--miku-info);
}

/* Header */
.c-modal__header {
  padding: 24px 24px 0;
  text-align: center;
}

.c-modal__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--miku-text);
  line-height: 1.4;
}

/* Close button */
.c-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--miku-text-muted);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.c-modal__close:hover {
  background-color: var(--miku-bg-secondary);
  color: var(--miku-text);
}

/* Content */
.c-modal__content {
  padding: 16px 24px 24px;
  overflow-y: auto;
  flex: 1;
}

.c-modal__text {
  margin: 0;
  text-align: center;
  color: var(--miku-text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

/* Footer */
.c-modal__footer {
  padding: 0 24px 24px;
}

.c-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Transitions */
.c-modal-enter-active,
.c-modal-leave-active {
  transition: opacity 0.3s ease;
}

.c-modal-enter-active .c-modal,
.c-modal-leave-active .c-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.c-modal-enter-from,
.c-modal-leave-to {
  opacity: 0;
}

.c-modal-enter-from .c-modal,
.c-modal-leave-to .c-modal {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}

/* Mobile optimization */
@media (max-width: 640px) {
  .c-modal-overlay {
    padding: 16px;
    align-items: flex-end;
  }
  
  .c-modal {
    border-radius: 16px 16px 0 0;
    max-height: 85vh;
    width: 100%;
    max-width: 100%;
  }
  
  .c-modal--centered {
    border-radius: 16px;
    max-height: calc(100vh - 32px);
  }
  
  .c-modal__actions {
    flex-direction: column-reverse;
  }
  
  .c-modal__actions :deep(.c-button) {
    width: 100%;
  }
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .c-modal {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  }
  
  .c-modal-overlay--mask {
    background-color: rgba(0, 0, 0, 0.65);
  }
}

.dark-mode .c-modal {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.dark-mode .c-modal-overlay--mask {
  background-color: rgba(0, 0, 0, 0.65);
}
</style>
