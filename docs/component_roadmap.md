# carrick-ui 组件规划

> 基于 **极简主义** 原则：能少就少，非必要不存在

---

## 已完成的组件 ✅

| 组件 | 用途 | 项目覆盖 |
|:---|:---|:---|
| CLogo | 品牌 Logo (Carrick + 项目名) | 全部 6 个 |
| TopNavbar | 工具型导航 (PC水平+Mobile汉堡) | Dashboard, Toolbox, Compare |
| ImmersiveNav | 沉浸型导航 (极简入口) | Novel, Drum, Xiangqi |
| CButton | 按钮 (基于 Naive UI 封装) | 通用 |
| CCard | 卡片 (基于 Naive UI 封装) | 通用 |
| CModal | 模态框 (基于 Naive UI 封装) | 通用 |

---

## 规划中的组件 📋

### 必备组件（建议做）

| 组件 | 必要性 | 理由 | 优先级 |
|:---|:---:|:---|:---:|
| **CInput** | ⭐⭐⭐ | 表单基础，所有项目都需要 | P1 |
| **CSelect** | ⭐⭐⭐ | 表单基础，筛选、设置必备 | P1 |
| **CToggle** | ⭐⭐⭐ | 开关控制，设置页必备 | P1 |
| **CBadge** | ⭐⭐⭐ | 状态标签，Dashboard/任务列表需要 | P1 |
| **CTag** | ⭐⭐⭐ | 标签云，Gallery/项目分类需要 | P1 |
| **CEmpty** | ⭐⭐☆ | 空状态，数据为空时的友好提示 | P2 |
| **CLoading** | ⭐⭐☆ | 加载状态，异步请求必备 | P2 |
| **CTooltip** | ⭐⭐☆ | 提示信息，解释图标含义 | P2 |
| **CConfirm** | ⭐⭐☆ | 确认对话框，删除操作必备 | P2 |

### 可选组件（看需求）

| 组件 | 必要性 | 理由 | 决策 |
|:---|:---:|:---|:---|
| CTable | ⭐⭐☆ | 数据表格，Dashboard 可能需要 | ❓ 看 Dashboard 是否有复杂表格 |
| CPagination | ⭐⭐☆ | 分页，列表页可能需要 | ❓ Novel 230章可能需要 |
| CToast | ⭐⭐☆ | 轻提示，操作反馈 | ❓ 用 Naive UI 原生的？ |
| CForm | ⭐☆☆ | 表单布局 | ❌ 用 CSS Grid/Flex 就行 |
| CSteps | ⭐☆☆ | 步骤条 | ❌ 目前没有多步骤流程 |
| CTimeline | ⭐☆☆ | 时间线 | ❌ Dashboard 有自己的 Timeline 页面 |
| CChart | ⭐☆☆ | 图表 | ❌ 目前没有数据可视化需求 |

### 不做（违背极简原则）

| 组件 | 理由 |
|:---|:---|
| CCarousel | 轮播图，纯装饰，非必要 |
| CCarousel3D | 3D 轮播，过度设计 |
| CRating | 评分星星，目前无评分需求 |
| CTransfer | 穿梭框，复杂且少用 |
| CTree | 树形组件，可用缩进列表替代 |
| CCalendar | 日历，日期选择器就够了 |
| CColorPicker | 颜色选择，目前无此需求 |
| CRichEditor | 富文本，太重，用 textarea |
| CUpload | 文件上传，原生 input 足够 |
| CSlider | 滑块，用 input number 替代 |

---

## 组件优先级路线图

### Phase 1: 基础表单 (P1)
- CInput - 输入框
- CSelect - 选择器
- CToggle - 开关

### Phase 2: 反馈与状态 (P2)
- CBadge - 徽章/标签
- CTag - 标签云
- CEmpty - 空状态
- CLoading - 加载

### Phase 3: 交互增强 (P2)
- CTooltip - 提示
- CConfirm - 确认对话框
- CToast - 轻提示（或直接用 Naive UI）

### Phase 4: 数据展示 (按需)
- CTable - 表格（如 Dashboard 需要）
- CPagination - 分页（如 Novel 需要）

---

## 决策流程图

```
需要新组件？
    ↓
现有组件组合能否实现？
    ↓ Yes → 不做新组件
    ↓ No
3+ 个项目会用吗？
    ↓ No → 项目内实现
    ↓ Yes
props 能 ≤7 个吗？
    ↓ No → 拆分组件
    ↓ Yes
支持 Light/Dark 吗？
    ↓ No → 简化设计
    ↓ Yes → 做！
```

---

## 使用 Naive UI 原生组件（不封装）

以下组件直接用 Naive UI，不在 carrick-ui 重复封装：

| Naive UI 组件 | 理由 |
|:---|:---|
| n-message | 消息提示，配置一次全局可用 |
| n-notification | 通知，配置一次全局可用 |
| n-dialog | 对话框，CConfirm 已覆盖常用场景 |
| n-popover | 气泡卡片，CTooltip 已覆盖 |
| n-dropdown | 下拉菜单，TopNavbar 已内置 |
| n-menu | 菜单，导航组件已覆盖 |
| n-tabs | 标签页，各项目需求差异大 |
| n-collapse | 折叠面板，使用频率低 |
| n-divider | 分割线，CSS border 足够 |
| n-space | 间距，CSS gap 足够 |
| n-grid | 栅格，CSS Grid 足够 |

---

## 维护原则

1. **组件数量 < 20 个**（目前 6 个，规划 +9 = 15 个）
2. **每个组件必须有 3+ 项目使用**
3. **每季度审查一次**，移除无用组件
4. **优先用 Naive UI**，其次才自己造
