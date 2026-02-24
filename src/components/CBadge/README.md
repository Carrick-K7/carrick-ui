# CBadge 组件

状态徽章/标记组件，用于显示状态、标签、数字提示等。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `color` | `'success' \| 'warning' \| 'error' \| 'info' \| 'primary' \| string` | `'primary'` | 徽章颜色，支持预设值或自定义颜色 |
| `type` | `'badge' \| 'dot'` | `'badge'` | 徽章类型：`badge`为标签样式，`dot`为圆点样式 |
| `closable` | `boolean` | `false` | 是否显示关闭按钮 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 徽章尺寸 |

### color 预设值说明

- `success` - 成功状态（绿色）
- `warning` - 警告状态（橙色）
- `error` - 错误状态（红色）
- `info` - 信息状态（蓝色）
- `primary` - 主色（Carrick 品牌色 #39C5BB）
- 自定义字符串 - 直接传入任意有效的 CSS 颜色值

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@close` | `(event: MouseEvent)` | 点击关闭按钮时触发，仅当 `closable=true` 时可用 |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `default` | 徽章内容，仅在 `type='badge'` 时有效 | - |

## 使用示例

### 示例 1：基础状态标签

用于展示不同的业务状态，如"已完成"、"审核中"、"已拒绝"等。

```vue
<template>
  <c-badge color="success">已通过</c-badge>
  <c-badge color="warning">审核中</c-badge>
  <c-badge color="error">已拒绝</c-badge>
  <c-badge color="info">待处理</c-badge>
</template>
```

### 示例 2：带关闭功能的标签

用于可移除的标签场景，如筛选条件、已选标签等。

```vue
<template>
  <div class="tag-list">
    <c-badge 
      v-for="tag in tags" 
      :key="tag"
      color="primary"
      closable
      @close="removeTag(tag)"
    >
      {{ tag }}
    </c-badge>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tags = ref(['Vue', 'React', 'TypeScript'])

const removeTag = (tag) => {
  tags.value = tags.value.filter(t => t !== tag)
}
</script>
```

### 示例 3：通知红点/状态指示器

用于显示未读消息、在线状态、新功能提示等。

```vue
<template>
  <!-- 消息图标带红点提示 -->
  <div class="icon-wrapper">
    <message-icon />
    <c-badge type="dot" color="error" class="notification-dot" />
  </div>

  <!-- 在线状态指示 -->
  <div class="user-avatar">
    <img src="avatar.jpg" />
    <c-badge type="dot" color="success" class="status-dot" />
  </div>

  <!-- 新功能标记 -->
  <div class="nav-item">
    发现
    <c-badge type="dot" color="warning" />
  </div>
</template>

<style scoped>
.icon-wrapper {
  position: relative;
  display: inline-flex;
}
.notification-dot {
  position: absolute;
  top: 0;
  right: 0;
}

.user-avatar {
  position: relative;
  display: inline-block;
}
.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  border: 2px solid #fff;
}
</style>
```

## 样式说明

### 颜色适配
- 亮色/暗色模式自动适配，基于 CSS 变量 `--miku-*`
- 自定义颜色支持完整的 CSS 颜色值（hex、rgb、rgba、hsl 等）

### 移动端适配
- 触摸目标 >= 44px
- 关闭按钮点击有视觉反馈
- 支持触摸设备的 `:active` 状态

### 圆角规范
- `badge` 类型：8px 圆角
- `dot` 类型：50% 圆形
