# Carrick UI - 技术规格文档

## 技术栈

| 层级 | 技术 |
|:---|:---|
| 框架 | Vue 3.x |
| 构建 | Vite |
| 样式 | CSS Variables + Scoped CSS |
| 包管理 | npm / pnpm |

## 目录结构

```
carrick-ui/
├── src/
│   ├── components/           # 组件目录
│   │   ├── TopNavbar/
│   │   │   └── TopNavbar.vue
│   │   └── ImmersiveNav/
│   │       └── ImmersiveNav.vue
│   ├── styles/
│   │   └── theme.js          # 设计系统变量
│   └── index.js              # 入口文件
├── .doc/                     # PTT 文档
│   ├── product_spec.md
│   ├── tech_spec.md
│   └── tasks/
├── package.json
└── README.md
```

## 组件规范

### 文件命名
- 组件名：PascalCase（如 `TopNavbar.vue`）
- 目录名：与组件名一致
- 样式：使用 `<style scoped>`

### Props 规范
```javascript
const props = defineProps({
  // 必填项
  projectName: {
    type: String,
    required: true
  },
  // 可选项带默认值
  showSearch: {
    type: Boolean,
    default: true
  }
})
```

### 事件规范
```javascript
const emit = defineEmits(['nav-click', 'toggle-theme'])
```

## 设计系统变量

```javascript
// theme.js
export const carrickTheme = {
  primary: '#39C5BB',
  fontMono: "'Consolas', monospace",
  fontSans: "'Inter', sans-serif",
  navbarHeight: '56px',
  // ...
}
```

## 发布流程

1. **开发**：本地修改组件
2. **测试**：在 Dashboard 项目中验证
3. **提交**：`git commit -m "feat: 新增 XXX 组件"`
4. **推送**：`git push origin master`
5. **引用**：其他项目更新 `package.json` 拉取最新

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

*技术规格 v1.0.0 - 2026-02-23*
