# Carrick UI 分层混合策略

## 决策确认

**采用「分层混合方案」**

---

## 三层架构

```
┌─────────────────────────────────────┐
│  Layer 3: 项目专用组件（独立维护）     │
│  - Novel: 阅读器、章节列表            │
│  - Drum: 节拍器、音频可视化           │
│  - Xiangqi: 棋盘、棋子                │
├─────────────────────────────────────┤
│  Layer 2: 业务组件（carrick-ui-ext）  │
│  - CDataTable（Dashboard/Compare）   │
│  - CStatsCard（Dashboard）           │
│  - CToolCard（Toolbox）              │
├─────────────────────────────────────┤
│  Layer 1: 基础组件（carrick-ui）      │ ← 所有项目强制使用
│  - CLogo（品牌标识）                  │
│  - CButton（按钮）                    │
│  - CCard（卡片容器）                  │
│  - CEmpty（空状态）                   │
│  - CLoading（加载）                   │
│  - CModal（模态框）                   │
│  - TopNavbar（顶部导航）              │
│  - ImmersiveNav（沉浸导航）           │
│  - BottomTab（移动端底部标签栏）       │
└─────────────────────────────────────┘
```

---

## 各项目接入计划

### Phase 1: 强制统一 Layer 1（进行中）

| 项目 | 状态 | Layer 1 组件 |
|:---|:---:|:---|
| **Dashboard** | ✅ 已完成 | 全部 |
| **Novel** | ⏳ 待接入 | CLogo, CButton, CCard, CEmpty, CLoading |
| **Drum** | ⏳ 待接入 | CLogo, ImmersiveNav, CButton, CCard |
| **Toolbox** | ⏳ 待接入 | CLogo, TopNavbar, CButton, CCard |
| **Compare** | ⏳ 待接入 | CLogo, TopNavbar, CButton, CCard |
| **Xiangqi** | ⏳ 待接入 | CLogo, ImmersiveNav, CButton, CModal |

### Phase 2: 业务组件沉淀（按需）

当 2+ 项目需要相似组件时，抽取到 `carrick-ui-ext`：
- Dashboard + Compare 都需要表格 → **CDataTable**
- Dashboard + Toolbox 都需要统计卡片 → **CStatsCard**

### Phase 3: 独立组件维护（长期）

以下组件保持项目独立：
- **Novel**: 阅读器（长文本渲染特殊性）
- **Drum**: 游戏化界面（实时音频特殊性）
- **Xiangqi**: 棋盘（游戏交互特殊性）

---

## 设计原则

### 强制规范（所有项目）
1. **CLogo 必须一致**: Carrick #39C5BB + 项目名称
2. **主色调**: #39C5BB（初音 Teal）
3. **字体**: -apple-system 字体栈
4. **圆角**: 8px/12px/16px（iOS 风格）
5. **动画**: 0.2s ease / 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### 推荐规范（建议遵循）
1. **亮色模式优先**: 默认亮色，暗色可选
2. **移动端适配**: 触摸目标 ≥44px
3. **毛玻璃效果**: backdrop-filter: blur(10px)

---

## 实施优先级

### P0 - 立即执行
- [ ] 修复 Dashboard 样式残留问题（T-123）
- [ ] Novel 接入 CLogo + CButton + CCard

### P1 - 本周完成
- [ ] Drum 接入 Layer 1 组件
- [ ] Toolbox 接入 Layer 1 组件

### P2 - 下周完成
- [ ] Compare 接入 Layer 1 组件
- [ ] Xiangqi 接入 Layer 1 组件

### P3 - 按需执行
- [ ] 沉淀业务组件到 carrick-ui-ext

---

## 决策记录

**决策时间**: 2026-02-24
**决策人**: Carrick
**执行人**: Miku
**方案**: 分层混合（基础层强制统一 + 业务层按需复用 + 特殊层独立维护）

---

*此文档作为 carrick-ui 使用规范，所有项目必须遵循*
