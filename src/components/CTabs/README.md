# CTabs 标签页组件

用于在同一个视图区域切换不同内容面板。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `modelValue` | `string \| number` | `-` | 当前激活的标签（支持 v-model） |
| `type` | `'line' \| 'card' \| 'segment'` | `'line'` | 标签类型 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 标签尺寸 |
| `position` | `'top' \| 'left' \| 'right' \| 'bottom'` | `'top'` | 标签位置 |
| `animated` | `boolean` | `true` | 是否开启动画 |
| `centered` | `boolean` | `false` | 标签是否居中 |
| `destroyInactive` | `boolean` | `false` | 是否销毁非激活标签内容 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@update:modelValue` | `(name: string \| number)` | 切换标签时触发 |
| `@change` | `(name: string \| number)` | 标签改变时触发 |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `default` | 标签页内容（CTabPane） | - |
| `extra` | 标签栏右侧额外内容 | - |

## CTabPane Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `name` | `string \| number` | `-` | 唯一标识（必填） |
| `label` | `string` | `-` | 标签标题 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `closable` | `boolean` | `false` | 是否可关闭 |

## 使用示例

### 示例 1：基础标签页

用于内容分区展示。

```vue
<template>
  <c-tabs v-model="activeTab">
    <c-tab-pane name="first" label="用户管理">
      用户管理内容
    </c-tab-pane>
    
    <c-tab-pane name="second" label="配置管理">
      配置管理内容
    </c-tab-pane>
    
    <c-tab-pane name="third" label="角色管理">
      角色管理内容
    </c-tab-pane>
  </c-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('first')
</script>
```

### 示例 2：卡片类型与自定义标签

用于带操作的标签页。

```vue
<template>
  <c-tabs v-model="activeTab" type="card">
    <c-tab-pane name="all" :closable="false">
      <template #label>
        <span class="custom-tab">
          <span class="badge">全部</span>
          <c-badge type="dot" color="primary" />
        </span>
      </template>
      全部内容
    </c-tab-pane>
    
    <c-tab-pane
      v-for="tab in dynamicTabs"
      :key="tab.name"
      :name="tab.name"
      :label="tab.label"
      closable
      @close="removeTab(tab.name)"
    >
      {{ tab.content }}
    </c-tab-pane>
    
    <template #extra>
      <c-button size="small" @click="addTab">+ 添加</c-button>
    </template>
  </c-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('all')
const dynamicTabs = ref([
  { name: 'tab1', label: '标签 1', content: '标签 1 内容' },
  { name: 'tab2', label: '标签 2', content: '标签 2 内容' }
])

let tabCount = 2

const addTab = () => {
  tabCount++
  const name = `tab${tabCount}`
  dynamicTabs.value.push({
    name,
    label: `标签 ${tabCount}`,
    content: `标签 ${tabCount} 内容`
  })
  activeTab.value = name
}

const removeTab = (name) => {
  const index = dynamicTabs.value.findIndex(t => t.name === name)
  dynamicTabs.value.splice(index, 1)
  if (activeTab.value === name) {
    activeTab.value = dynamicTabs.value[0]?.name || 'all'
  }
}
</script>

<style scoped>
.custom-tab {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
```

### 示例 3：分段控制器与侧边布局

用于移动端或侧边导航。

```vue
<template>
  <div class="tabs-demos">
    <!-- 分段控制器 -->
    <c-tabs v-model="segmentTab" type="segment" centered>
      <c-tab-pane name="day" label="日" />
      <c-tab-pane name="week" label="周" />
      <c-tab-pane name="month" label="月" />
      <c-tab-pane name="year" label="年" />
    </c-tabs>
    
    <!-- 左侧标签 -->
    <c-tabs v-model="sideTab" position="left" type="line">
      <c-tab-pane name="basic" label="基本信息">
        <div class="pane-content">基本信息设置...</div>
      </c-tab-pane>
      
      <c-tab-pane name="security" label="安全设置">
        <div class="pane-content">安全设置内容...</div>
      </c-tab-pane>
      
      <c-tab-pane name="notification" label="通知设置" disabled>
        <div class="pane-content">通知设置内容...</div>
      </c-tab-pane>
    </c-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const segmentTab = ref('day')
const sideTab = ref('basic')
</script>

<style scoped>
.pane-content {
  padding: 20px;
  min-height: 200px;
}
</style>
```

## 样式说明

### 类型规范

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `line` | 底部线条指示器 | 常规标签页 |
| `card` | 卡片式标签 | 可关闭、多标签 |
| `segment` | 分段控制器 | 切换选项、移动端 |

### 尺寸规范

| 尺寸 | 标签高度 | 字体大小 | 内边距 |
|------|----------|----------|--------|
| `small` | 32px | 13px | 0 12px |
| `medium` | 40px | 14px | 0 16px |
| `large` | 48px | 15px | 0 20px |

### 状态样式

- 激活态：`--miku-primary` 颜色指示
- 禁用态：透明度 0.4，无点击效果
- 悬停态：文字颜色加深

### 暗色模式

自动适配暗色模式，背景、边框、文字颜色根据主题调整。

### 移动端适配

- 触摸目标 ≥ 44px
- 支持横向滚动（标签过多时）
- 分段控制器宽度自适应
