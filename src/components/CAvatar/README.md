# CAvatar 头像组件

用于展示用户头像或组织标识。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `src` | `string` | `''` | 图片地址 |
| `alt` | `string` | `''` | 图片 alt 文本 |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 头像尺寸 |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | 头像形状 |
| `fallback` | `string` | `''` | 图片加载失败时的回显文字 |
| `border` | `boolean` | `false` | 是否显示边框 |
| `borderColor` | `string` | `-` | 边框颜色 |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | `-` | 状态指示 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@error` | `(event: Event)` | 图片加载失败时触发 |
| `@click` | `(event: MouseEvent)` | 点击头像时触发 |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `default` | 自定义头像内容 | - |
| `fallback` | 自定义回显内容 | - |

## 使用示例

### 示例 1：基础头像

用于用户列表、评论区等场景。

```vue
<template>
  <div class="avatar-list">
    <c-avatar src="https://example.com/user1.jpg" />
    <c-avatar src="https://example.com/user2.jpg" size="small" />
    
    <c-avatar src="https://example.com/user3.jpg" size="large" />
  </div>
</template>
```

### 示例 2：文字回显与状态

用于无头像用户和在线状态展示。

```vue
<template>
  <div class="user-list">
    <div class="user-item">
      <c-avatar 
        src="https://broken-url.jpg" 
        fallback="张三"
        status="online"
      />
      <span>张三</span>
    </div>
    
    <div class="user-item">
      <c-avatar 
        src="https://broken-url.jpg" 
        fallback="李四"
        status="busy"
        border
      />
      <span>李四</span>
    </div>
    
    <div class="user-item">
      <c-avatar 
        fallback="王五"
        shape="rounded"
        :size="48"
        status="away"
      />
      <span>王五</span>
    </div>
  </div>
</template>
```

### 示例 3：自定义内容与组合

用于团队展示、头像组等复杂场景。

```vue
<template>
  <div class="avatar-demos">
    <!-- 带图标的头像 -->
    <c-avatar shape="square" size="large" border
>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </c-avatar>
    
    <!-- 头像组 -->
    <div class="avatar-group">
      <c-avatar
        v-for="(user, index) in users"
        :key="user.id"
        :src="user.avatar"
        :fallback="user.name.charAt(0)"
        size="medium"
        border
        border-color="#fff"
        :style="{ marginLeft: index > 0 ? '-12px' : '0', zIndex: users.length - index }"
      />
      <c-avatar
        fallback="+3"
        size="medium"
        shape="circle"
        :style="{ marginLeft: '-12px' }"
      />
    </div>
    
    <!-- 可点击头像 -->
    <c-avatar
      src="https://example.com/profile.jpg"
      size="large"
      @click="goToProfile"
      style="cursor: pointer;"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Carol', avatar: 'https://i.pravatar.cc/150?img=3' }
])

const goToProfile = () => {
  console.log('跳转到个人主页')
}
</script>

<style scoped>
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group .c-avatar {
  transition: transform 0.2s ease;
}

.avatar-group .c-avatar:hover {
  transform: translateY(-2px);
  z-index: 100 !important;
}
</style>
```

## 样式说明

### 尺寸规范

| 尺寸预设 | 大小 |
|----------|------|
| `small` | 32px |
| `medium` | 40px |
| `large` | 56px |
| 数字 | 自定义像素值 |

### 形状规范

| 形状 | 圆角 |
|------|------|
| `circle` | 50% |
| `square` | 0 |
| `rounded` | 8px |

### 状态颜色

| 状态 | 颜色 |
|------|------|
| `online` | #52c41a |
| `offline` | #999999 |
| `away` | #faad14 |
| `busy` | #ff4d4f |

### 文字回显样式

当图片加载失败或未提供时，显示 fallback 文字：
- 背景色：`--miku-primary`
- 文字颜色：白色
- 字体大小：根据尺寸自适应

### 暗色模式

自动适配暗色模式，边框和背景色根据主题调整。

### 移动端适配

- 触摸目标 ≥ 44px（当可点击时）
- 支持长按保存图片
