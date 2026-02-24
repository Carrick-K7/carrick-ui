<template>
  <nav class="carrick-top-navbar" :class="{ 'is-scrolled': isScrolled }">
    <div class="navbar-container">
      <!-- 左侧：Logo -->
      <div class="navbar-brand">
        <a :href="homeLink" class="brand-link">
          <CLogo variant="circle" :logoSrc="logoSrc" :altText="`${projectName} Logo`" size="md" />
          <span class="brand-text">{{ projectName }}</span>
        </a>
      </div>

      <!-- 右侧：导航 + 工具 -->
      <div class="navbar-right">
        <!-- 导航链接 -->
        <div class="navbar-nav">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.path"
            class="nav-link"
            :class="{ active: isActive(item.path) }"
            @click.prevent="handleNavClick(item)"
          >
            {{ item.label }}
          </a>
        </div>

        <!-- 工具区 -->
        <div class="navbar-tools">
          <!-- 搜索（可选） -->
          <button
            v-if="showSearch"
            class="tool-btn search-btn"
            @click="$emit('search')"
            title="搜索 (⌘K)"
          >
            <Search class="tool-icon" :size="18" />
            <span class="tool-shortcut">⌘K</span>
          </button>

          <!-- 主题切换（可选） -->
          <button
            v-if="showThemeToggle"
            class="tool-btn theme-btn"
            @click="$emit('toggle-theme')"
            :title="isDarkMode ? '切换亮色模式' : '切换暗色模式'"
          >
            <Sun v-if="isDarkMode" :size="18" />
            <Moon v-else :size="18" />
          </button>

          <!-- 自定义工具插槽 -->
          <slot name="tools"></slot>

          <!-- 用户头像（可选） -->
          <button
            v-if="showUser"
            class="tool-btn user-btn"
            @click="$emit('user-click')"
          >
            <img v-if="userAvatar" :src="userAvatar" class="user-avatar" alt="头像" />
            <User v-else class="user-icon" :size="20" />
          </button>
        </div>
      </div>

      <!-- 移动端汉堡菜单 -->
      <button class="mobile-menu-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <X v-if="isMobileMenuOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>

    <!-- 移动端底部 Drawer -->
    <transition name="drawer">
      <div v-if="isMobileMenuOpen" class="mobile-drawer-container">
        <!-- 遮罩 -->
        <div class="drawer-overlay" @click="isMobileMenuOpen = false"></div>
        
        <!-- Drawer -->
        <div class="mobile-drawer" @touchmove.prevent>
          <!-- 拖拽指示条 -->
          <div class="drawer-handle"></div>
          
          <!-- 菜单列表 -->
          <nav class="drawer-nav">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.path"
              class="drawer-link"
              :class="{ active: isActive(item.path) }"
              @click.prevent="handleNavClick(item); isMobileMenuOpen = false"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Search, Sun, Moon, User, Menu, X } from 'lucide-vue-next'
import CLogo from '../CLogo/CLogo.vue'

const props = defineProps({
  projectName: {
    type: String,
    required: true
  },
  projectIcon: {
    type: String,
    default: '🎵'
  },
  homeLink: {
    type: String,
    default: '/'
  },
  logoSrc: {
    type: String,
    default: '/logo/carrick-logo-32x32.png'
  },
  navItems: {
    type: Array,
    default: () => []
  },
  activePath: {
    type: String,
    default: ''
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  showThemeToggle: {
    type: Boolean,
    default: false
  },
  showUser: {
    type: Boolean,
    default: true
  },
  userAvatar: {
    type: String,
    default: ''
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['nav-click', 'search', 'toggle-theme', 'user-click'])

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const isActive = (path) => {
  if (!props.activePath) return false
  return props.activePath === path || props.activePath.startsWith(path + '/')
}

const handleNavClick = (item) => {
  emit('nav-click', item)
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.carrick-top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--miku-border);
  z-index: 1000;
  transition: all 0.2s ease;
}

.carrick-top-navbar.is-scrolled {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* Logo 区域 */
.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-text {
  font-family: 'Cascadia Code', 'Fira Code', monospace;
  font-size: 18px;
  font-weight: 600;
  color: var(--miku-text);
  letter-spacing: -0.3px;
}

/* 右侧区域：导航 + 工具 */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* 导航链接 */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--miku-text-secondary);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(57, 197, 187, 0.1);
  color: var(--miku-text);
}

.nav-link.active {
  background: rgba(57, 197, 187, 0.15);
  color: #39C5BB;
}

/* 工具区 */
.navbar-tools {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--miku-text-secondary);
  transition: all 0.2s ease;
}

.tool-btn:hover {
  background: rgba(57, 197, 187, 0.1);
  color: var(--miku-text);
}

.tool-shortcut {
  font-size: 12px;
  color: var(--miku-text-muted);
  background: var(--miku-bg-secondary);
  padding: 2px 6px;
  border-radius: 4px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

/* 移动端 */
.mobile-menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: var(--miku-text-secondary);
}

.mobile-menu-btn:hover {
  background: rgba(57, 197, 187, 0.1);
  color: var(--miku-text);
}

/* 移动端底部 Drawer */
.mobile-drawer-container {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.drawer-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.mobile-drawer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70vh;
  max-height: 500px;
  border-radius: 16px 16px 0 0;
  background: var(--miku-card-bg, #fff);
  display: flex;
  flex-direction: column;
}

.drawer-handle {
  width: 40px;
  height: 4px;
  background: var(--miku-text-muted, #999);
  border-radius: 2px;
  margin: 12px auto;
}

.drawer-nav {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.drawer-link {
  display: block;
  padding: 16px 24px;
  font-size: 16px;
  color: var(--miku-text);
  text-decoration: none;
  border-bottom: 1px solid var(--miku-border);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.drawer-link:last-child {
  border-bottom: none;
}

.drawer-link:hover,
.drawer-link:active {
  background: rgba(57, 197, 187, 0.1);
}

.drawer-link.active {
  color: #39C5BB;
  background: rgba(57, 197, 187, 0.1);
}

/* Drawer 动画 */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active .mobile-drawer,
.drawer-leave-active .mobile-drawer {
  transition: transform 0.3s ease;
}

.drawer-enter-from .mobile-drawer,
.drawer-leave-to .mobile-drawer {
  transform: translateY(100%);
}

/* 响应式 */
@media (max-width: 1023px) {
  .navbar-container {
    padding: 0 16px;
  }

  .navbar-right {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .carrick-top-navbar {
    background: rgba(26, 26, 26, 0.9);
  }

  .mobile-drawer {
    background: rgba(26, 26, 26, 0.95);
  }
}
</style>
