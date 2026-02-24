# CProgress 进度条组件

用于展示操作进度、加载状态、任务完成度等。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `percentage` | `number` | `0` | 进度百分比 (0-100) |
| `type` | `'line' \| 'circle' \| 'dashboard'` | `'line'` | 进度条类型 |
| `status` | `'active' \| 'success' \| 'exception' \| 'warning'` | `'active'` | 进度状态 |
| `strokeWidth` | `number` | `6` | 进度条宽度 (px) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 进度条尺寸 |
| `showText` | `boolean` | `true` | 是否显示进度文字 |
| `format` | `(percentage: number) => string` | `-` | 自定义进度文字格式 |
| `indeterminate` | `boolean` | `false` | 不确定进度模式（动画） |
| `color` | `string` | `-` | 自定义进度条颜色 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@change` | `(percentage: number)` | 进度变化时触发 |
| `@complete` | `()` | 进度达到 100% 时触发 |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `default` | 自定义进度文字 | `{ percentage }` |

## 使用示例

### 示例 1：基础线性进度条

用于文件上传、数据同步等操作进度展示。

```vue
<template>
  <div class="upload-progress">
    <c-progress :percentage="uploadProgress" />
    <c-progress 
      :percentage="uploadProgress" 
      status="success"
      :show-text="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const uploadProgress = ref(45)
</script>
```

### 示例 2：圆形进度条

用于仪表盘、评分展示等场景。

```vue
<template>
  <div class="dashboard">
    <c-progress 
      type="circle" 
      :percentage="75" 
      size="large"
      status="success"
    />
    
    <c-progress 
      type="circle" 
      :percentage="cpuUsage" 
      :stroke-width="8"
      :color="cpuColor"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const cpuUsage = ref(65)
const cpuColor = computed(() => {
  if (cpuUsage.value < 50) return '#52c41a'
  if (cpuUsage.value < 80) return '#faad14'
  return '#ff4d4f'
})
</script>
```

### 示例 3：不确定进度与自定义格式

用于未知时长的操作加载。

```vue
<template>
  <div class="loading-states">
    <c-progress indeterminate :stroke-width="4" />
    
    <c-progress 
      :percentage="downloadProgress"
      :format="formatProgress"
    >
      <template #default="{ percentage }">
        <span class="custom-progress-text">
          {{ downloadedSize }} / {{ totalSize }} MB
        </span>
      </template>
    </c-progress>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const downloadProgress = ref(35)
const totalSize = 100

const downloadedSize = computed(() => {
  return (totalSize * downloadProgress.value / 100).toFixed(1)
})

const formatProgress = (pct) => {
  return `${pct}% 已完成`
}
</script>

<style scoped>
.custom-progress-text {
  font-size: 12px;
  color: var(--miku-text-secondary);
}
</style>
```

## 样式说明

### 状态颜色

| 状态 | 颜色值 | 说明 |
|------|--------|------|
| `active` | `#39c5bb` | 进行中 |
| `success` | `#52c41a` | 成功完成 |
| `exception` | `#ff4d4f` | 失败/异常 |
| `warning` | `#faad14` | 警告 |

### 尺寸规范

| 尺寸 | 线型高度 | 圆形直径 |
|------|----------|----------|
| `small` | 4px | 60px |
| `medium` | 6px | 100px |
| `large` | 8px | 140px |

### 暗色模式

自动适配暗色模式，背景轨道颜色根据主题调整。

### 移动端适配

- 触摸目标 ≥ 44px（当可交互时）
- 进度条高度保证可见性
