# T-112~T-118: P0 组件批量抽取执行计划

## 执行模式
**批量作业** - 连续执行，最后统一验收

## 组件队列

| 顺序 | Task | 组件 | 预计时间 | 依赖 |
|:---:|:---|:---|:---:|:---|
| 1 | T-112 | CStatusDot 状态点 | 20min | - |
| 2 | T-113 | CProgress 进度条 | 25min | - |
| 3 | T-114 | CSwitch 开关 | 20min | - |
| 4 | T-115 | CEmpty 空状态 | 20min | - |
| 5 | T-116 | CLoading 加载 | 20min | - |
| 6 | T-117 | CAvatar 头像 | 25min | - |
| 7 | T-118 | CTabs 标签页 | 30min | - |

## 统一规范（所有组件）

### 文档要求
- README.md 必须包含：Props/Events/Slots/示例
- 使用示例 ≥3 个场景

### 样式要求
- 必须使用 CSS 变量：`--miku-primary`, `--miku-text`, `--miku-bg`
- 暗色模式自动适配（通过 CSS 变量）
- 圆角：8px（按钮/卡片），50%（圆形）

### 移动端要求
- 触摸目标 ≥44px
- 添加 `touch-action: manipulation`
- 添加 `-webkit-tap-highlight-color: transparent`

### 代码规范
- Props 命名：camelCase
- 事件命名：kebab-case（@change, @click）
- 插槽命名：default, prefix, suffix

## QA 检查单（每个组件）
- [ ] README 完整
- [ ] 组件实现符合设计
- [ ] 暗色模式测试
- [ ] 移动端触摸测试
- [ ] 无 TODO/FIXME
- [ ] carrick-ui build 成功

## 批量执行流程
1. 依次执行 T-112 → T-113 → T-114 → T-115 → T-116 → T-117 → T-118
2. 每个组件完成后立即构建验证
3. 全部完成后统一 Git 提交
4. **最后通知 Carrick 统一验收**

## 迁移计划（T-119）
所有组件验收通过后，统一迁移到 Dashboard：
- 替换现有实现
- 统一样式
- 删除冗余代码

## 时间预估
- 组件抽取：~3 小时
- 统一验收：Carrick 决定
- 迁移应用：~2 小时
- **总计：~5 小时（不含等待验收）**
