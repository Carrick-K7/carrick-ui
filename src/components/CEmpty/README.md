# CEmpty 空状态组件

用于页面内容为空时的占位展示。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `description` | `string` | `'暂无数据'` | 描述文字 |
| `image` | `string` | `-` | 自定义图片 URL 或预设类型 |
| `imageSize` | `number` | `120` | 图片尺寸 (px) |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@click` | `(event: MouseEvent)` | 点击空状态时触发 |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| `image` | 自定义图片内容 | - |
| `description` | 自定义描述内容 | - |
| `default` | 底部操作区域 | - |

## 使用示例

### 示例 1：基础空状态

用于列表、表格无数据时的默认展示。

```vue
<template>
  <c-empty />
  <c-empty description="暂无订单" />
</template>
```

### 示例 2：自定义图片和尺寸

根据场景使用不同的空状态插图。

```vue
<template>
  <div class="empty-states">
    <c-empty 
      image="search" 
      description="未找到相关结果"
      :image-size="100"
    />
    
    <c-empty 
      image="error" 
      description="加载失败，请重试"
      :image-size="140"
    />
    
    <c-empty 
      image="network" 
      description="网络连接失败"
      :image-size="120"
    />
  </div>
</template>
```

### 示例 3：带操作按钮

在空状态下方提供操作入口。

```vue
<template>
  <c-empty description="还没有创建任何项目">
    <template #image>
      <div class="custom-empty-icon">
        <svg viewBox="0 0 64 64" width="120" height="120">
          <rect x="8" y="12" width="48" height="40" rx="4" fill="#f0f0f0"/>
          <rect x="16" y="20" width="32" height="4" rx="2" fill="#d9d9d9"/>
          <rect x="16" y="28" width="24" height="4" rx="2" fill="#d9d9d9"/>
          <circle cx="44" cy="44" r="12" fill="#39c5bb"/>
          <path d="M40 44h8M44 40v8" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </template>
    
    <template #default>
      <c-button type="primary" @click="createProject">
        创建新项目
      </c-button>
      <c-button @click="importProject">
        导入项目
      </c-button>
    </template>
  </c-empty>
</template>

<script setup>
const createProject = () => {
  console.log('创建项目')
}

const importProject = () => {
  console.log('导入项目')
}
</script>

<style scoped>
.custom-empty-icon {
  display: flex;
  justify-content: center;
}
</style>
```

## 预设图片类型

| 类型 | 说明 | 场景 |
|------|------|------|
| `default` | 默认空状态图 | 通用无数据 |
| `search` | 搜索无结果 | 搜索、筛选结果为空 |
| `error` | 错误状态 | 加载失败、系统错误 |
| `network` | 网络问题 | 网络断开、请求超时 |
| `403` | 无权限 | 访问受限 |
| `404` | 页面不存在 | 内容未找到 |
| `500` | 服务器错误 | 服务端异常 |

## 样式说明

### 默认样式

- 图片尺寸：120px
- 描述文字：14px，颜色 `--miku-text-secondary`
- 上下内边距：40px

### 暗色模式

自动适配暗色模式，图片使用半透明效果。

### 移动端适配

- 图片尺寸在移动端自适应
- 文字大小根据设备调整
- 操作按钮垂直排列
