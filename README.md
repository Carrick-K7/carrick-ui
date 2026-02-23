# @carrick/ui-components

Carrick Design System - 通用导航组件库

## 🧩 组件列表

### 1. TopNavbar - 顶部导航栏
适合：Dashboard、Toolbox、Compare 等工具/管理类项目

```vue
<script setup>
import { TopNavbar } from '@carrick/ui-components'

const navItems = [
  { name: 'dashboard', label: '总览', path: '/' },
  { name: 'team', label: '团队', path: '/team' },
  { name: 'gallery', label: 'Gallery', path: '/gallery' }
]

const handleNavClick = (item) => {
  router.push(item.path)
}
</script>

<template>
  <TopNavbar
    projectName="Dashboard"
    projectIcon="🎛️"
    :navItems="navItems"
    activePath="/dashboard"
    :showSearch="true"
    :showThemeToggle="true"
    @nav-click="handleNavClick"
    @toggle-theme="toggleTheme"
  />
</template>
```

**Props:**
| 属性 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| projectName | String | 必填 | 项目名称 |
| projectIcon | String | '🎵' | 项目图标 |
| homeLink | String | '/' | 首页链接 |
| navItems | Array | [] | 导航项 `[{name, label, path}]` |
| activePath | String | '' | 当前激活路径 |
| showSearch | Boolean | true | 显示搜索按钮 |
| showThemeToggle | Boolean | true | 显示主题切换 |
| showUser | Boolean | true | 显示用户头像 |
| userAvatar | String | '' | 用户头像URL |
| isDarkMode | Boolean | false | 是否暗色模式 |

**Events:**
- `nav-click(item)` - 导航项点击
- `search` - 搜索按钮点击
- `toggle-theme` - 主题切换
- `user-click` - 用户头像点击

---

### 2. ImmersiveNav - 沉浸导航
适合：Drum、Xiangqi、Novel 等全屏沉浸类项目

```vue
<script setup>
import { ImmersiveNav } from '@carrick/ui-components'

const navItems = [
  { name: 'practice', label: '练习', path: '/practice', icon: '🥁' },
  { name: 'lesson', label: '教程', path: '/lesson', icon: '📖' },
  { name: 'free', label: '自由', path: '/free', icon: '🎵' }
]
</script>

<template>
  <ImmersiveNav
    projectName="Drum"
    projectIcon="🥁"
    :navItems="navItems"
    position="bottom-right"
    :showMinimalHeader="true"
    @nav-click="handleNavClick"
  />
</template>
```

**Props:**
| 属性 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| projectName | String | 必填 | 项目名称 |
| projectIcon | String | '🎵' | 项目图标 |
| menuIcon | String | '☰' | 菜单按钮图标 |
| homeLink | String | '/' | 首页链接 |
| navItems | Array | [] | 导航项 `[{name, label, path, icon}]` |
| activePath | String | '' | 当前激活路径 |
| position | String | 'bottom-right' | 菜单位置 |
| showMinimalHeader | Boolean | true | 显示极简顶部条 |
| showThemeToggle | Boolean | true | 显示主题切换 |
| showHome | Boolean | true | 显示首页按钮 |
| offsetX | Number | 24 | 水平偏移 |
| offsetY | Number | 24 | 垂直偏移 |

**position 可选值:**
- `bottom-right` - 右下角
- `bottom-left` - 左下角
- `top-right` - 右上角
- `top-left` - 左上角

---

## 🎨 设计系统

```javascript
import { carrickTheme } from '@carrick/ui-components'

// 品牌色
carrickTheme.primary        // #39C5BB (初音蓝绿)
carrickTheme.fontMono       // Consolas, Monaco
carrickTheme.fontSans       // Inter, sans-serif
carrickTheme.navbarHeight   // 56px
```

---

## 📦 安装

```bash
# 本地文件引用
npm install file:./packages/ui-components

# 或 GitHub 引用
npm install github:Carrick-K7/carrick-dashboard#packages/ui-components
```

---

## 📝 新项目接入指南

**Step 1: 判断项目类型**
- 工具/管理/仪表盘 → 用 **TopNavbar**
- 游戏/阅读/创作 → 用 **ImmersiveNav**

**Step 2: 安装组件库**
```bash
npm install @carrick/ui-components
```

**Step 3: 引入使用**
```vue
<script setup>
import { TopNavbar } from '@carrick/ui-components'
// 你的项目导航配置
const navItems = [...]
</script>

<template>
  <TopNavbar
    projectName="NewProject"
    :navItems="navItems"
    ...
  />
</template>
```

---

## ✅ 特点

- **样式统一**: 所有项目使用 Carrick Design System
- **内容自由**: 通过 props 传入各项目自己的导航内容
- **响应式**: 自动适配桌面端和移动端
- **暗色模式**: 支持 prefers-color-scheme
- **零依赖**: 仅依赖 Vue 3

---

*Carrick Team - 保持一致，自由生长*