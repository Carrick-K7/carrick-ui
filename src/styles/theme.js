// Carrick Design System - 通用样式变量
export const carrickTheme = {
  // 品牌色
  primary: '#39C5BB',
  primaryLight: 'rgba(57, 197, 187, 0.1)',
  primaryDark: '#2ba89f',
  
  // 字体
  fontMono: "'Consolas', 'Monaco', monospace",
  fontSans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  
  // 导航栏尺寸
  navbarHeight: '56px',
  navbarHeightMobile: '48px',
  
  // 颜色
  textPrimary: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  bgPrimary: '#ffffff',
  bgSecondary: '#f5f5f5',
  borderColor: 'rgba(0, 0, 0, 0.05)',
  
  // 阴影
  shadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  shadowHover: '0 4px 12px rgba(0, 0, 0, 0.1)',
  
  // 过渡
  transition: 'all 0.2s ease',
  
  // 圆角
  radius: '8px',
  radiusSmall: '4px'
}

// 暗色模式
export const carrickThemeDark = {
  ...carrickTheme,
  textPrimary: '#ffffff',
  textSecondary: '#cccccc',
  textMuted: '#888888',
  bgPrimary: '#1a1a1a',
  bgSecondary: '#2a2a2a',
  borderColor: 'rgba(255, 255, 255, 0.1)'
}