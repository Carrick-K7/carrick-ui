# CSwitch 开关组件

用于在两种状态之间切换，如启用/禁用、开启/关闭等。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `modelValue` | `boolean` | `false` | 绑定值（支持 v-model） |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 开关尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 是否处于加载状态 |
| `activeText` | `string` | `''` | 开启时的文字描述 |
| `inactiveText` | `string` | `''` | 关闭时的文字描述 |
| `activeColor` | `string` | `-` | 开启时的自定义颜色 |
| `inactiveColor` | `string` | `-` | 关闭时的自定义颜色 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@update:modelValue` | `(value: boolean)` | 值变化时触发（v-model） |
| `@change` | `(value: boolean)` | 状态变化时触发 |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `activeAction` | 开启状态的图标/内容 | - |
| `inactiveAction` | 关闭状态的图标/内容 | - |

## 使用示例

### 示例 1：基础开关

用于设置项的启用/禁用切换。

```vue
<template>
  <div class="settings">
    <div class="setting-item">
      <span>接收通知</span>
      <c-switch v-model="notifications" />
    </div>
    
    <div class="setting-item">
      <span>自动保存</span>
      <c-switch v-model="autoSave" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const notifications = ref(true)
const autoSave = ref(false)
</script>
```

### 示例 2：带文字和加载状态

用于异步操作的状态切换。

```vue
<template>
  <div class="feature-toggles">
    <c-switch
      v-model="darkMode"
      active-text="深色"
      inactive-text="浅色"
      @change="handleThemeChange"
    />
    
    <c-switch
      v-model="syncEnabled"
      :loading="syncLoading"
      active-text="已同步"
      inactive-text="未同步"
      @change="handleSyncToggle"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const darkMode = ref(false)
const syncEnabled = ref(false)
const syncLoading = ref(false)

const handleThemeChange = (value) => {
  document.documentElement.classList.toggle('dark-mode', value)
}

const handleSyncToggle = async (value) => {
  syncLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  syncLoading.value = false
}
</script>
```

### 示例 3：自定义图标

使用插槽自定义开关内的图标。

```vue
<template>
  <div class="custom-switches">
    <c-switch v-model="wifi" size="large">
      <template #activeAction>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
      </template>
      <template #inactiveAction>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.43-1.43-3.09-2.4-4.85-2.9l2.52 2.52c.49.13.97.34 1.41.61l2.02-2.23zM19 13h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2zM1.39 4.22l2.27 2.27C2.61 8.04 1.12 9.97 0 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l2.87 2.87 1.41-1.41L2.81 2.81 1.39 4.22zM6.26 9.12l5.15 5.15C9.5 13.92 7.35 13.69 6.26 9.12z"/>
        </svg>
      </template>
    </c-switch>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const wifi = ref(true)
</script>
</style>
```

## 样式说明

### 尺寸规范

| 尺寸 | 宽度 | 高度 | 手柄直径 |
|------|------|------|----------|
| `small` | 32px | 18px | 14px |
| `medium` | 44px | 24px | 20px |
| `large` | 56px | 30px | 26px |

### 颜色规范

- 开启状态：`--miku-primary` (#39c5bb) 或自定义颜色
- 关闭状态：`#bfbfbf`
- 禁用状态：透明度 0.4

### 暗色模式

自动适配暗色模式，背景色和边框色根据主题调整。

### 移动端适配

- 触摸目标 ≥ 44px
- 触摸时有视觉反馈
- 支持滑动手势切换
