# CStatusDot 状态点组件

状态指示点组件，用于显示在线状态、系统状态、设备状态等。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `status` | `'online' \| 'offline' \| 'away' \| 'busy' \| 'warning' \| 'error'` | `'online'` | 状态类型 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 点的大小 |
| `pulse` | `boolean` | `false` | 是否显示脉冲动画 |
| `showText` | `boolean` | `false` | 是否显示状态文字 |
| `text` | `string` | `-` | 自定义状态文字，不传则使用默认 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@click` | `(event: MouseEvent)` | 点击状态时触发 |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `default` | 自定义状态文字内容 | `{ status }` |

## 使用示例

### 示例 1：基础状态指示

用于显示用户在线状态、设备连接状态等。

```vue
<template>
  <div class="user-list">
    <div class="user-item">
      <c-status-dot status="online" />
      <span>张三</span>
    </div>
    <div class="user-item">
      <c-status-dot status="away" />
      <span>李四</span>
    </div>
    <div class="user-item">
      <c-status-dot status="offline" />
      <span>王五</span>
    </div>
  </div>
</template>
```

### 示例 2：带文字和脉冲动画

用于系统监控、服务状态展示等重要状态指示。

```vue
<template>
  <div class="system-status">
    <c-status-dot 
      status="online" 
      show-text 
      pulse
      text="系统运行中"
    />
    <c-status-dot 
      :status="serverStatus" 
      show-text 
      :pulse="serverStatus === 'warning'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const serverStatus = ref('online')
</script>
```

### 示例 3：自定义内容

使用插槽自定义状态显示内容。

```vue
<template>
  <div class="custom-status">
    <c-status-dot status="busy" show-text>
      <template #default="{ status }">
        <span class="custom-text">
          当前状态: {{ statusTextMap[status] }}
        </span>
      </template>
    </c-status-dot>
  </div>
</template>

<script setup>
const statusTextMap = {
  online: '在线',
  offline: '离线',
  away: '离开',
  busy: '忙碌',
  warning: '警告',
  error: '错误'
}
</script>

<style scoped>
.custom-text {
  color: var(--miku-text-secondary);
  font-size: 14px;
}
</style>
```

## 样式说明

### 状态颜色

| 状态 | 颜色值 | 说明 |
|------|--------|------|
| `online` | `#52c41a` | 在线/正常 |
| `offline` | `#999999` | 离线/未连接 |
| `away` | `#faad14` | 离开/暂离 |
| `busy` | `#ff4d4f` | 忙碌/占用 |
| `warning` | `#faad14` | 警告/注意 |
| `error` | `#ff4d4f` | 错误/异常 |

### 尺寸规范

| 尺寸 | 直径 | 用途 |
|------|------|------|
| `small` | 6px | 紧凑布局、列表内 |
| `medium` | 10px | 常规使用 |
| `large` | 14px | 突出显示 |

### 暗色模式

自动适配暗色模式，颜色保持语义一致性。

### 移动端适配

- 触摸目标 ≥ 44px（当可点击时）
- 状态点保持视觉清晰
