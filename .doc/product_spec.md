# Carrick UI - 产品规格文档

## 产品定位
Carrick Design System 的官方 UI 组件库，为所有 Carrick 项目提供统一、美观、易用的界面组件。

## 设计原则

### 1. 一致性
- 所有组件遵循 Carrick Design System
- 品牌色：#39C5BB（初音蓝绿）
- 字体：Consolas（等宽）+ Inter（无衬线）

### 2. 可配置性
- 样式统一，内容自由
- 通过 props 传入各项目自定义内容
- 不强制业务逻辑

### 3. 响应式
- 移动端优先设计
- 自动适配不同屏幕尺寸
- 支持暗色模式

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
