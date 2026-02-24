# Carrick UI - 产品规格文档

## 产品定位
Carrick Design System 的官方 UI 组件库，为所有 Carrick 项目提供统一、美观、易用的界面组件。

## 设计原则

### 核心理念：iOS Human Interface + 初音美学

Carrick UI 融合 **Apple iOS Human Interface Guidelines** 的设计哲学与 **初音未来（Hatsune Miku）** 的品牌美学，打造精致、现代、一致的跨平台体验。

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

### v1.0.0（当前）
- [x] TopNavbar - 顶部导航栏
- [x] ImmersiveNav - 沉浸导航

### v1.1.0（规划中）
- [ ] Button - 按钮组件
- [ ] Card - 卡片容器
- [ ] Icon - 图标系统

### v1.2.0（规划中）
- [ ] Modal - 弹窗
- [ ] Form - 表单元素（Input、Select、Checkbox）
- [ ] Loading - 加载动画

### v2.0.0（远期）
- [ ] Chart - 图表组件
- [ ] Table - 数据表格
- [ ] Timeline - 时间线

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

*产品规格 v1.0.0 - 2026-02-23*
