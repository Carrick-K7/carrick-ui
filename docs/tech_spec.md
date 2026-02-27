# Carrick UI - 技术规格文档

## 技术栈

| 层级 | 技术 |
|:---|:---|
| 框架 | Vue 3.x |
| UI 基础 | Naive UI |
| 构建 | Vite |
| 样式 | Naive UI 主题系统 + CSS Variables |
| 包管理 | npm / pnpm |

## 架构说明

### 基于 Naive UI 封装

carrick-ui 不是从零开发，而是基于成熟的 Naive UI 组件库进行 Carrick 品牌定制：

```
carrick-ui/
├── src/
│   ├── components/
│   │   ├── CButton/          # 基于 n-button 封装
│   │   ├── CCard/            # 基于 n-card 封装
│   │   ├── CModal/           # 基于 n-modal 封装
│   │   ├── TopNavbar/        # 完全自定义（Naive 无此组件）
│   │   └── ImmersiveNav/     # 完全自定义
│   ├── theme/
│   │   └── carrickTheme.js   # Carrick 主题配置
│   └── index.js              # 入口文件
```

### 为什么选 Naive UI？

1. **主题系统强大** - 可深度定制颜色、字体、圆角等
2. **Vue 3 原生** - Composition API 完美支持
3. **TypeScript** - 类型支持好
4. **按需引入** - 不会打包未使用的组件
5. **现代化设计** - 比 Element Plus 更现代

## 组件分类

### 类型 A：基于 Naive UI 封装
使用 Naive UI 组件作为基础，进行 Carrick 品牌定制：

```vue
<!-- CButton.vue -->
<template>
  <n-button :color="carrickColor">
    <slot />
  </n-button>
</template>
```

**组件列表：**
- CButton（按钮）
- CCard（卡片）
- CModal（弹窗）
- 未来：CInput、CSelect、CTable...

### 类型 B：完全自定义
Naive UI 没有或不符合需求的组件，自己实现：

**组件列表：**
- TopNavbar（顶部导航栏）
- ImmersiveNav（沉浸导航）

## 主题系统

### Carrick 品牌配置
```javascript
// theme/carrickTheme.js
export const carrickTheme = {
  common: {
    primaryColor: '#39C5BB',           // 初音蓝绿
    fontFamilyMono: "'Cascadia Code', monospace",
    borderRadius: '8px',
    // ...
  }
}
```

### 使用方式
```javascript
import { NConfigProvider } from 'naive-ui'
import { carrickThemeConfig } from '@carrick/ui-components'

app.use(NConfigProvider, carrickThemeConfig)
```

## 目录结构

```
carrick-ui/
├── src/
│   ├── components/
│   │   ├── CButton/
│   │   │   └── CButton.vue
│   │   ├── CCard/
│   │   │   └── CCard.vue
│   │   ├── CModal/
│   │   │   └── CModal.vue
│   │   ├── TopNavbar/
│   │   │   └── TopNavbar.vue
│   │   └── ImmersiveNav/
│   │       └── ImmersiveNav.vue
│   ├── theme/
│   │   └── carrickTheme.js
│   └── index.js
├── .doc/
│   ├── product_spec.md
│   ├── tech_spec.md
│   └── tasks/
├── package.json
└── README.md
```

## 开发流程

1. **基于 Naive 封装组件**：
   - 复制 n-xxx 组件
   - 应用 Carrick 主题
   - 添加/修改 props
   - 测试验证

2. **自定义组件**：
   - 使用 Vue 3 单文件组件
   - 遵循 Carrick 设计系统
   - 使用 theme.js 中的变量

## 发布流程

1. 开发：本地修改组件
2. 测试：在 Dashboard 项目中验证
3. 提交：`git commit -m "feat: 新增 XXX 组件"`
4. 推送：`git push origin master`
5. 引用：其他项目更新 `package.json` 拉取最新

## 版本号规则

遵循 [Semantic Versioning](https://semver.org/)：
- `MAJOR`：破坏性变更（v1 → v2）
- `MINOR`：新功能（v1.0 → v1.1）
- `PATCH`：修复（v1.0.0 → v1.0.1）

## 未来改进

- [ ] TypeScript 支持
- [ ] 单元测试（Vitest）
- [ ] Storybook 文档站点
- [ ] 自动化发布到 NPM

---

*技术规格 v2.0.0 - 基于 Naive UI*
