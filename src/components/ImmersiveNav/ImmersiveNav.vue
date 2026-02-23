<template>
  <div class="carrick-immersive-nav">
    <!-- 浮动菜单按钮 -->
    <button
      class="floating-menu-btn"
      :class="{ 'is-open': isMenuOpen, [position]: true }"
      @click="isMenuOpen = !isMenuOpen"
      :style="buttonStyle"
    >
      <span class="menu-icon">{{ isMenuOpen ? '✕' : menuIcon }}</span>
    </button>

    <!--  radial 菜单 -->
    <transition name="radial">
      <div v-if="isMenuOpen" class="radial-menu" :class="position">
        <!-- 项目 Logo -->
        <div class="menu-center">
          <span class="center-icon">{{ projectIcon }}</span>
          <span class="center-name">{{ projectName }}</span>
        </div>

        <!-- 导航项（环形排列） -->
        <a
          v-for="(item, index) in navItems"
          :key="item.name"
          :href="item.path"
          class="radial-item"
          :class="{ active: isActive(item.path) }"
          :style="getRadialStyle(index)"
          @click.prevent="handleNavClick(item)"
        >
          <span class="item-icon">{{ item.icon || '•' }}</span>
          <span class="item-label">{{ item.label }}</span>
        </a>

        <!-- 工具按钮 -->
        <button
          v-if="showThemeToggle"
          class="radial-item theme-item"
          :style="getRadialStyle(navItems.length)"
          @click="$emit('toggle-theme')"
        >
          <span class="item-icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
          <span class="item-label">主题</span>
        </button>

        <button
          v-if="showHome"
          class="radial-item home-item"
          :style="getRadialStyle(navItems.length + (showThemeToggle ? 1 : 0))"
          @click="goHome"
        >
          <span class="item-icon">🏠</span>
          <span class="item-label">首页</span>
        </button>
      </div>
    </transition>

    <!-- 遮罩 -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="menu-overlay"
        @click="isMenuOpen = false"
      ></div>
    </transition>

    <!-- 极简顶部条（可选，仅显示 Logo） -->
    <div v-if="showMinimalHeader" class="minimal-header">
      <a :href="homeLink" class="minimal-brand">
        <span class="minimal-icon">{{ projectIcon }}</span>
        <span class="minimal-name">{{ projectName }}</span>
      </a>
      <slot name="header-extra"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // 项目名称
  projectName: {
    type: String,
    required: true
  },
  // 项目图标
  projectIcon: {
    type: String,
    default: '🎵'
  },
  // 菜单按钮图标
  menuIcon: {
    type: String,
    default: '☰'
  },
  // 首页链接
  homeLink: {
    type: String,
    default: '/'
  },
  // 导航项
  navItems: {
    type: Array,
    default: () => []
    // 格式: [{ name: 'practice', label: '练习', path: '/practice', icon: '🥁' }, ...]
  },
  // 当前激活路径
  activePath: {
    type: String,
    default: ''
  },
  // 按钮位置
  position: {
    type: String,
    default: 'bottom-right'
    // 可选: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  },
  // 是否显示极简顶部条
  showMinimalHeader: {
    type: Boolean,
    default: true
  },
  // 是否显示主题切换
  showThemeToggle: {
    type: Boolean,
    default: true
  },
  // 是否显示首页按钮
  showHome: {
    type: Boolean,
    default: true
  },
  // 是否暗色模式
  isDarkMode: {
    type: Boolean,
    default: false
  },
  // 按钮偏移
  offsetX: {
    type: Number,
    default: 24
  },
  offsetY: {
    type: Number,
    default: 24
  }
})

const emit = defineEmits(['nav-click', 'toggle-theme', 'go-home'])

const isMenuOpen = ref(false)

// 按钮样式
const buttonStyle = computed(() => {
  const style = {}
  if (props.position.includes('bottom')) {
    style.bottom = `${props.offsetY}px`
  } else {
    style.top = `${props.offsetY}px`
  }
  if (props.position.includes('right')) {
    style.right = `${props.offsetX}px`
  } else {
    style.left = `${props.offsetX}px`
  }
  return style
})

// 计算环形菜单项位置
const getRadialStyle = (index) => {
  const total = props.navItems.length + (props.showThemeToggle ? 1 : 0) + (props.showHome ? 1 : 0)
  const radius = 100 // 环形半径
  const angleStep = (2 * Math.PI) / total
  const angle = index * angleStep - Math.PI / 2 // 从顶部开始

  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius

  return {
    transform: `translate(${x}px, ${y}px)`,
    transitionDelay: `${index * 0.05}s`
  }
}

const isActive = (path) => {
  if (!props.activePath) return false
  return props.activePath === path
}

const handleNavClick = (item) => {
  emit('nav-click', item)
  isMenuOpen.value = false
}

const goHome = () => {
  emit('go-home')
  isMenuOpen.value = false
}
</script>

<style scoped>
.carrick-immersive-nav {
  pointer-events: none;
}

.carrick-immersive-nav > * {
  pointer-events: auto;
}

/* 浮动菜单按钮 */
.floating-menu-btn {
  position: fixed;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: #39C5BB;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(57, 197, 187, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-menu-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(57, 197, 187, 0.5);
}

.floating-menu-btn.is-open {
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(180deg);
}

.menu-icon {
  transition: transform 0.3s ease;
}

/* 环形菜单 */
.radial-menu {
  position: fixed;
  width: 200px;
  height: 200px;
  z-index: 999;
}

.radial-menu.bottom-right {
  right: -72px;
  bottom: -72px;
}

.radial-menu.bottom-left {
  left: -72px;
  bottom: -72px;
}

.radial-menu.top-right {
  right: -72px;
  top: -72px;
}

.radial-menu.top-left {
  left: -72px;
  top: -72px;
}

.menu-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.center-icon {
  font-size: 32px;
}

.center-name {
  font-size: 12px;
  font-weight: 600;
  color: #39C5BB;
  white-space: nowrap;
}

/* 环形菜单项 */
.radial-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  margin: -24px 0 0 -24px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.radial-item:hover {
  transform: scale(1.15) !important;
  background: #39C5BB;
  color: white;
}

.radial-item:hover .item-label {
  color: white;
}

.radial-item.active {
  background: #39C5BB;
  color: white;
}

.radial-item.active .item-label {
  color: white;
}

.item-icon {
  font-size: 20px;
  line-height: 1;
}

.item-label {
  font-size: 10px;
  font-weight: 500;
  color: #666;
  white-space: nowrap;
}

.theme-item {
  background: #f0f0f0;
}

.home-item {
  background: #e8f8f7;
}

/* 遮罩 */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 998;
}

/* 极简顶部条 */
.minimal-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent);
  z-index: 100;
}

.minimal-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.minimal-icon {
  font-size: 20px;
}

.minimal-name {
  font-family: 'Consolas', monospace;
  font-size: 16px;
  font-weight: 600;
}

/* 动画 */
.radial-enter-active,
.radial-leave-active {
  transition: all 0.3s ease;
}

.radial-enter-from,
.radial-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.radial-enter-active .radial-item,
.radial-leave-active .radial-item {
  transition: all 0.3s ease;
}

.radial-enter-from .radial-item,
.radial-leave-to .radial-item {
  transform: translate(0, 0) !important;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .radial-item {
    background: #2a2a2a;
  }

  .radial-item .item-label {
    color: #ccc;
  }

  .theme-item {
    background: #333;
  }

  .home-item {
    background: #1a3a38;
  }
}
</style>