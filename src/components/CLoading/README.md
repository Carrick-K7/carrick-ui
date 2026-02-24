# CLoading 加载组件

用于页面和区块的加载状态展示。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `loading` | `boolean` | `true` | 是否显示加载状态 |
| `type` | `'spinner' \| 'dots' \| 'wave' \| 'pulse'` | `'spinner'` | 加载动画类型 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 加载器尺寸 |
| `color` | `string` | `-` | 自定义颜色 |
| `text` | `string` | `''` | 加载提示文字 |
| `fullscreen` | `boolean` | `false` | 是否全屏显示 |
| `mask` | `boolean` | `true` | 是否显示遮罩层 |
| `delay` | `number` | `0` | 延迟显示时间 (ms) |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@afterLeave` | `()` | 加载动画结束后触发 |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `default` | 被包裹的内容（指令式使用） | - |
| `text` | 自定义加载文字 | - |
| `indicator` | 自定义加载图标 | - |

## 使用示例

### 示例 1：基础加载

用于数据加载、页面初始化的状态提示。

```vue
<template>
  <div class="loading-demos">
    <c-loading />
    <c-loading text="加载中..." />
    
    <c-loading type="dots" />
    
    <c-loading type="wave" size="large" />
  </div>
</template>
```

### 示例 2：区块加载

用于包裹内容，在加载时显示遮罩。

```vue
<template>
  <c-loading :loading="isLoading" text="数据加载中...">
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </c-loading>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const data = ref([])

onMounted(async () => {
  await fetchData()
  isLoading.value = false
})

const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  data.value = [
    { id: 1, name: '张三', age: 25, status: '正常' },
    { id: 2, name: '李四', age: 30, status: '正常' }
  ]
}
</script>
```

### 示例 3：全屏加载与自定义

用于页面级操作或自定义样式。

```vue
<template>
  <div class="fullscreen-demo">
    <c-button @click="showFullscreenLoading">
      显示全屏加载
    </c-button>
    
    <c-loading 
      v-model:loading="fullscreenLoading"
      fullscreen
      type="pulse"
      text="正在保存..."
    >
      <template #indicator>
        <div class="custom-loader">
          <svg viewBox="0 0 100 100" width="60" height="60">
            <circle cx="50" cy="50" r="40" stroke="var(--miku-primary)" stroke-width="6" fill="none">
              <animate 
                attributeName="stroke-dasharray" 
                values="0 251;251 0" 
                dur="2s" 
                repeatCount="indefinite"
              />
              <animate 
                attributeName="stroke-dashoffset" 
                values="0;-251" 
                dur="2s" 
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </template>
    </c-loading>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fullscreenLoading = ref(false)

const showFullscreenLoading = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 3000)
}
</script>

<style scoped>
.custom-loader {
  display: flex;
  justify-content: center;
}
</style>
```

## 样式说明

### 加载器类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `spinner` | 旋转圆环 | 通用加载 |
| `dots` | 跳动圆点 | 紧凑空间 |
| `wave` | 波浪动画 | 活泼场景 |
| `pulse` | 脉冲扩散 | 强调效果 |

### 尺寸规范

| 尺寸 | spinner | dots | 文字 |
|------|---------|------|------|
| `small` | 20px | 6px | 12px |
| `medium` | 32px | 10px | 14px |
| `large` | 48px | 14px | 16px |

### 暗色模式

自动适配暗色模式，遮罩颜色和加载器颜色根据主题调整。

### 移动端适配

- 触摸禁止交互
- 全屏加载时显示返回按钮区域
- 文字大小适配移动端
