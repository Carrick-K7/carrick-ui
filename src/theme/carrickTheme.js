// Carrick Design System - Naive UI 主题覆盖配置
// 注意：不要使用 createTheme，它只接受 string 或 array 参数
// 我们直接导出主题覆盖对象

// Carrick 品牌色
const carrickPrimary = '#39C5BB'
const carrickPrimaryHover = '#2ba89f'
const carrickPrimaryPressed = '#248b84'

// 亮色主题覆盖
export const carrickTheme = {
  common: {
    // 品牌色
    primaryColor: carrickPrimary,
    primaryColorHover: carrickPrimaryHover,
    primaryColorPressed: carrickPrimaryPressed,
    primaryColorSuppl: carrickPrimary,
    
    // 字体
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Cascadia Code', 'JetBrains Mono', monospace",
    
    // 圆角
    borderRadius: '8px',
    borderRadiusSmall: '4px',
    
    // 文字颜色
    textColorBase: '#333333',
    textColor1: '#333333',
    textColor2: '#666666',
    textColor3: '#999999',
    
    // 背景色
    baseColor: '#ffffff',
    bodyColor: '#f5f5f5',
    
    // 边框
    borderColor: 'rgba(0, 0, 0, 0.08)',
    
    // 阴影
    boxShadow1: '0 1px 2px rgba(0, 0, 0, 0.05)',
    boxShadow2: '0 4px 12px rgba(0, 0, 0, 0.08)',
    boxShadow3: '0 8px 24px rgba(0, 0, 0, 0.12)',
    
    // 过渡
    cubicBezierEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Button 组件定制
  Button: {
    fontWeight: '500',
    borderRadiusSmall: '6px',
    borderRadiusMedium: '8px',
    borderRadiusLarge: '10px',
  },
  
  // Card 组件定制
  Card: {
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  
  // Input 组件定制
  Input: {
    borderRadius: '8px',
  },
  
  // Modal 组件定制
  Modal: {
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  },
}

// 暗色主题覆盖
export const carrickThemeDark = {
  common: {
    ...carrickTheme.common,
    textColorBase: '#ffffff',
    textColor1: '#ffffff',
    textColor2: '#cccccc',
    textColor3: '#888888',
    baseColor: '#1a1a1a',
    bodyColor: '#121212',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow1: '0 1px 2px rgba(0, 0, 0, 0.2)',
    boxShadow2: '0 4px 12px rgba(0, 0, 0, 0.3)',
    boxShadow3: '0 8px 24px rgba(0, 0, 0, 0.4)',
  },
  Button: carrickTheme.Button,
  Card: carrickTheme.Card,
  Input: carrickTheme.Input,
  Modal: carrickTheme.Modal,
}

// 主题配置对象（供 NConfigProvider 使用）
export const carrickThemeConfig = {
  themeOverrides: {
    common: {
      primaryColor: carrickPrimary,
      primaryColorHover: carrickPrimaryHover,
      primaryColorPressed: carrickPrimaryPressed,
    }
  }
}
