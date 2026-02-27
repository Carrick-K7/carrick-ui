# Carrick UI - 产品规格文档

## 技术栈

```
🎨 样式: Tailwind CSS (原子类优先)
🎭 图标: Lucide Icons (SVG)
⚡ 构建: Vite
🎯 框架: Vue 3 + Composition API
```

**核心原则**: 纯 Tailwind CSS，无 UI 框架依赖

---

## 产品定位
Carrick Design System 的官方 UI 组件库，为所有 Carrick 项目提供统一、美观、易用的界面组件。

## 快速开始

### 安装
```bash
npm install @carrick/ui-components
```

### 使用
```vue
<template>
  <CButton variant="primary" @click="handleClick">
    <Plus class="w-4 h-4 mr-2" />
    新建任务
  </CButton>
</template>

<script setup>
import { CButton } from '@carrick/ui-components'
import { Plus } from 'lucide-vue-next'
</script>
```

---

## 设计原则

### 核心理念：现代极简 + 初音美学

Carrick UI 融合 **现代极简设计原则** 与 **初音未来（Hatsune Miku）** 的品牌美学，打造精致、现代、一致的跨平台体验。设计参考 Linear、Vercel、Notion 等现代 SaaS 产品。

### 1. 清晰（Clarity）
- 文字易读、图标明确、留白充足
- 层级分明，信息架构清晰
- 视觉噪音最小化

### 2. 尊重（Deference）
- 内容优先，UI 不喧宾夺主
- 使用毛玻璃、半透明效果
- 让用户专注于内容而非界面

### 3. 深度（Depth）
- 分层设计，动画引导视线
- 触摸反馈，物理感交互
- 微妙动效增强体验

### 4. 初音美学
- **品牌色**：#39C5BB（初音 Teal）
- **氛围**：清新、科技、未来感
- **贯穿所有组件的识别度**

---

## 设计系统

### 颜色系统

#### 品牌色
| 用途 | 颜色 | Hex | 场景 |
|:---|:---|:---|:---|
| 主色 | 初音 Teal | `#39C5BB` | 激活、主按钮、强调 |
| 主色 Hover | Deep Teal | `#2BA89F` | 悬停状态 |
| 主色 Light | Light Teal | `#5DDDD4` | 高亮、脉冲 |

#### iOS 语义色
| 用途 | 颜色 | Hex | iOS 标准 |
|:---|:---|:---|:---:|
| 成功 | Green | `#34C759` | ✅ |
| 警告 | Orange | `#FF9500` | ✅ |
| 错误 | Red | `#FF3B30` | ✅ |
| 信息 | Blue | `#007AFF` | ✅ |

#### 中性色（亮/暗模式）
| 用途 | 亮色模式 | 暗色模式 |
|:---|:---|:---|
| 文本主色 | `#1C1C1E` | `#FFFFFF` |
| 文本次要 | `#8E8E93` | `#8E8E93` |
| 背景 | `#F2F2F7` | `#1C1C1E` |
| 卡片背景 | `#FFFFFF` | `#2C2C2E` |
| 分隔线 | `#E5E5EA` | `#38383A` |

### 字体系统

#### 字体栈
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

#### 字号规范
| 层级 | 大小 | 字重 | 用途 |
|:---|:---:|:---:|:---|
| 大标题 | 28px | Bold | 页面标题 |
| 标题 | 22px | Semibold | 区块标题 |
| 小标题 | 17px | Semibold | 卡片标题 |
| 正文 | 14px | Regular | 普通文本 |
| 辅助 | 12px | Regular | 说明文字 |
| 标签 | 10px | Medium | 底部标签 |

### 间距系统

#### 基础单位：8px
| 令牌 | 数值 | 用途 |
|:---|:---:|:---|
| xs | 4px | 图标内边距 |
| sm | 8px | 紧凑间距 |
| md | 16px | 标准间距 |
| lg | 24px | 宽松间距 |
| xl | 32px | 区块间距 |
| xxl | 48px | 大区块间距 |

### 圆角系统
| 令牌 | 数值 | 用途 |
|:---|:---:|:---|
| sm | 4px | 小按钮、标签 |
| md | 8px | 按钮、输入框 |
| lg | 12px | 卡片、弹窗 |
| xl | 16px | 大卡片、Drawer |
| full | 50% | 圆形元素 |

### 阴影系统
| 层级 | 数值 |
|:---|:---|
| 无 | `none` |
| 小 | `0 1px 2px rgba(0,0,0,0.05)` |
| 中 | `0 4px 12px rgba(0,0,0,0.1)` |
| 大 | `0 8px 24px rgba(0,0,0,0.15)` |

### 动画系统

#### 时间
| 类型 | 时长 | 用途 |
|:---|:---:|:---|
| 快速 | 0.15s | 按钮按下、开关切换 |
| 标准 | 0.2s | 状态变化、hover |
| 流畅 | 0.3s | 页面切换、弹出 |

#### 缓动函数
```css
/* 标准 */
transition: all 0.2s ease;

/* iOS 弹簧 */
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* 减速（入场） */
transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
```

### 图标系统

#### 图标库选择
**优先使用 Lucide Icons** (<https://lucide.dev>)
- 简洁、现代的线条风格
- 与现代极简设计原则一致
- 支持 SVG，可自定义颜色
- 社区活跃，持续更新

#### 使用规范
```html
<!-- Lucide 图标示例 - MessageCircle -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
</svg>
```

#### 图标尺寸
| 场景 | 尺寸 | 说明 |
|:---|:---:|:---|
| 按钮图标 | 16-20px | 配合文字使用 |
| 导航图标 | 20-24px | 独立显示 |
| 装饰图标 | 24-32px | 空状态、引导页 |
| 大图标 | 48-64px | 特色功能展示 |

#### 图标颜色
- 默认：`currentColor`（继承文字颜色）
- 激活：`var(--miku-primary)` #39C5BB
- 禁用：`var(--miku-text-muted)` #8E8E93

---

### 毛玻璃效果
```css
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.8);
```

### 触摸目标
- **最小尺寸**：44px × 44px
- **最佳尺寸**：48px × 48px
- **底部标签栏**：64px 高度（含安全区）

### 响应式断点
| 断点 | 宽度 | 设备 |
|:---|:---:|:---|
| sm | < 640px | 手机 |
| md | 640-1024px | 平板 |
| lg | > 1024px | PC |

### 暗色模式
- 使用 `prefers-color-scheme: dark` 媒体查询
- 或 `.dark-mode` 类手动切换
- 所有组件必须支持暗色模式

## 组件路线图

### 已发布组件（v1.x）
- [x] TopNavbar - 顶部导航栏
- [x] ImmersiveNav - 沉浸导航
- [x] CButton - 按钮组件
- [x] CCard - 卡片容器
- [x] CLogo - Logo 组件
- [x] CModal - 模态框
- [x] CBadge - 徽章/状态标签
- [x] CStatusDot - 状态点
- [x] CProgress - 进度条
- [x] CSwitch - 开关
- [x] CEmpty - 空状态
- [x] CLoading - 加载
- [x] CAvatar - 头像
- [x] CTabs - 标签页
- [x] BottomTab - 移动端底部标签栏

### 规划中（v1.3.0）
- [ ] CForm - 表单容器
- [ ] CInput - 输入框
- [ ] CSelect - 选择器
- [ ] CCheckbox - 复选框
- [ ] CRadio - 单选框
- [ ] CTooltip - 文字提示

### 远期（v2.0.0）
- [ ] CTable - 数据表格
- [ ] CTimeline - 时间线
- [ ] CPagination - 分页
- [ ] CTree - 树形控件

## 发布计划

| 版本 | 时间 | 内容 |
|:---|:---|:---|
| v1.0.0 | 2026-02 | 导航组件（TopNavbar、ImmersiveNav）|
| v1.1.0 | 2026-03 | 基础组件（Button、Card、Icon）|
| v1.2.0 | 2026-04 | 表单+反馈组件 |
| v2.0.0 | 2026-Q2 | 数据展示组件 |

## 使用规范

### 安装
```bash
npm install github:Carrick-K7/carrick-ui#master
```

### 引入
```javascript
import { TopNavbar, ImmersiveNav } from '@carrick/ui-components'
```

## 兼容性
- Vue 3.x
- TypeScript（规划中）
- 现代浏览器（Chrome、Firefox、Safari、Edge）

---

*产品规格 v1.2.0 - 2026-02-24*
*设计系统：现代极简 + 初音美学*
