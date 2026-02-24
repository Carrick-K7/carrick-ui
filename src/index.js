// Carrick UI - 基于 Naive UI 封装的组件库
import { 
  NButton, 
  NCard, 
  NModal,
  NInput,
  NSpace,
  NConfigProvider
} from 'naive-ui'

// 主题配置
import { carrickTheme, carrickThemeDark, carrickThemeConfig } from './theme/carrickTheme.js'

// 基础组件（基于 Naive UI 封装）
import CButton from './components/CButton/CButton.vue'
import CCard from './components/CCard/CCard.vue'
import CModal from './components/CModal/CModal.vue'

// 自定义组件（自己实现）
import TopNavbar from './components/TopNavbar/TopNavbar.vue'
import ImmersiveNav from './components/ImmersiveNav/ImmersiveNav.vue'

// 导出组件
export {
  // Naive UI 组件（直接导出，方便用户使用）
  NButton,
  NCard,
  NModal,
  NInput,
  NSpace,
  NConfigProvider,
  
  // Carrick 封装组件
  CButton,
  CCard,
  CModal,
  
  // Carrick 自定义组件
  TopNavbar,
  ImmersiveNav,
  
  // 主题
  carrickTheme,
  carrickThemeDark,
  carrickThemeConfig
}

// 默认导出
export default {
  install(app) {
    // 注册所有组件
    app.component('CButton', CButton)
    app.component('CCard', CCard)
    app.component('CModal', CModal)
    app.component('TopNavbar', TopNavbar)
    app.component('ImmersiveNav', ImmersiveNav)
  }
}