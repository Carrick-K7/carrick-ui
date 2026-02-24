<template>
  <nav class="carrick-top-navbar" :class="{ 'is-scrolled': isScrolled }">
    <div class="navbar-container">
      <!-- 左侧：Logo -->
      <div class="navbar-brand">
        <a :href="homeLink" class="brand-link">
          <CLogo :project="projectName" size="md" />
        </a>
      </div>

      <!-- 中间：导航链接（各项目自定义） -->
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

      <!-- 右侧：工具区 -->
      <div class="navbar-tools">
        <!-- 搜索（可选） -->
        <button
          v-if="showSearch"
          class="tool-btn search-btn"
          @click="$emit('search')"
          title="搜索 (⌘K)"
        >
          <span class="tool-icon">🔍</span>
          <span class="tool-shortcut">⌘K</span>
        </button>

        <!-- 主题切换（可选） -->
        <button
          v-if="showThemeToggle"
          class="tool-btn theme-btn"
          @click="$emit('toggle-theme')"
          :title="isDarkMode ? '切换亮色模式' : '切换暗色模式'"
        >
          {{ isDarkMode ? '☀️' : '🌙' }}
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
          <span v-else class="user-icon">👤</span>
        </button>
      </div>

      <!-- 移动端汉堡菜单 -->
      <button class="mobile-menu-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
        {{ isMobileMenuOpen ? '✕' : '☰' }}
      </button>
    </div>

    <!-- 移动端下拉菜单 -->
    <transition name="dropdown">
      <div v-if="isMobileMenuOpen" class="mobile-dropdown">
        <div class="dropdown-overlay" @click="isMobileMenuOpen = false"></div>
        <nav class="dropdown-nav">
          <a
            v-for="(item, index) in navItems"
            :key="item.name"
            :href="item.path"
            class="dropdown-link"
            :class="{ active: isActive(item.path) }"
            @click.prevent="handleNavClick(item)"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CLogo from '../CLogo/CLogo.vue'

const props = defineProps({
  // 项目名称
  projectName: {
    type: String,
    required: true
  },
  // 项目图标（emoji 或字符）
  projectIcon: {
    type: String,
    default: '🎵'
  },
  // 首页链接
  homeLink: {
    type: String,
    default: '/'
  },
  // 导航项（各项目自定义）
  navItems: {
    type: Array,
    default: () => []
    // 格式: [{ name: 'dashboard', label: '总览', path: '/' }, ...]
  },
  // 当前激活的路径
  activePath: {
    type: String,
    default: ''
  },
  // 是否显示搜索按钮
  showSearch: {
    type: Boolean,
    default: true
  },
  // 是否显示主题切换（已废弃，主题切换移到右下角浮动按钮）
  showThemeToggle: {
    type: Boolean,
    default: false
  },
  // 是否显示用户头像
  showUser: {
    type: Boolean,
    default: true
  },
  // 用户头像URL
  userAvatar: {
    type: String,
    default: ''
  },
  // 是否暗色模式
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['nav-click', 'search', 'toggle-theme', 'user-click'])

// 移动端菜单状态
const isMobileMenuOpen = ref(false)
// 滚动状态
const isScrolled = ref(false)

// 判断当前导航项是否激活
const isActive = (path) => {
  if (!props.activePath) return false
  return props.activePath === path || props.activePath.startsWith(path + '/')
}

// 处理导航点击
const handleNavClick = (item) => {
  emit('nav-click', item)
  isMobileMenuOpen.value = false
}

// 监听滚动
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
  gap: 6px;
  text-decoration: none;
}

.brand-icon {
  font-size: 20px;
}

.brand-name {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 20px;
  font-weight: 700;
  color: #39C5BB;
}

.brand-project {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--miku-text-secondary);
}

/* 导航链接 */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
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
  font-size: 20px;
  cursor: pointer;
  border-radius: 8px;
  z-index: 10;
  position: relative;
}

.mobile-menu-btn:hover {
  background: rgba(57, 197, 187, 0.1);
}

/* 移动端下拉菜单 */
.mobile-dropdown {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 1001;
}

.dropdown-overlay {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dropdown-nav {
  position: relative;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--miku-border);
  display: flex;
  flex-direction: column;
  padding: 8px 0;
}

.dropdown-link {
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--miku-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--miku-border);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.dropdown-link:last-child {
  border-bottom: none;
}

.dropdown-link:hover,
.dropdown-link:active {
  background: rgba(57, 197, 187, 0.1);
  color: var(--miku-text);
}

.dropdown-link.active {
  background: rgba(57, 197, 187, 0.15);
  color: #39C5BB;
}

/* 下拉菜单动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* 响应式 */
@media (max-width: 1023px) {
  .navbar-container {
    padding: 0 16px;
  }

  .navbar-nav {
    display: none;
  }

  .tool-shortcut {
    display: none;
  }

  .navbar-tools {
    margin-right: 8px;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .carrick-top-navbar {
    background: rgba(26, 26, 26, 0.9);
  }

  .dropdown-nav {
    background: rgba(26, 26, 26, 0.95);
  }
}
</style>
