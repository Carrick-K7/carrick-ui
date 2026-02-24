// Carrick UI - 基于 Naive UI 封装的组件库
import { 
  NButton, 
  NCard, 
  NModal,
  NInput,
  NSpace,
  NConfigProvider
} from 'naive-ui'

// CSS 变量
import './styles/vars.css'

// 主题配置
import { carrickTheme, carrickThemeDark, carrickThemeConfig } from './theme/carrickTheme.js'

// 基础组件（基于 Naive UI 封装）
import CButton from './components/CButton/CButton.vue'
import CCard from './components/CCard/CCard.vue'
import CModal from './components/CModal/CModal.vue'

// 自定义组件（自己实现）
import TopNavbar from './components/TopNavbar/TopNavbar.vue'
import ImmersiveNav from './components/ImmersiveNav/ImmersiveNav.vue'
import CLogo from './components/CLogo/CLogo.vue'
import CBadge from './components/CBadge/CBadge.vue'

// P0 组件 - T-112~T-118
import CStatusDot from './components/CStatusDot/CStatusDot.vue'
import CProgress from './components/CProgress/CProgress.vue'
import CSwitch from './components/CSwitch/CSwitch.vue'
import CEmpty from './components/CEmpty/CEmpty.vue'
import CLoading from './components/CLoading/CLoading.vue'
import CAvatar from './components/CAvatar/CAvatar.vue'
import CTabs, { CTabPane } from './components/CTabs/index.js'

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
  CLogo,
  CBadge,
  
  // P0 组件 T-112~T-118
  CStatusDot,   // T-112: 状态点
  CProgress,    // T-113: 进度条
  CSwitch,      // T-114: 开关
  CEmpty,       // T-115: 空状态
  CLoading,     // T-116: 加载
  CAvatar,      // T-117: 头像
  CTabs,        // T-118: 标签页
  CTabPane,     // T-118: 标签页面板
  
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
    app.component('CLogo', CLogo)
    app.component('CBadge', CBadge)
    
    // 注册 P0 组件
    app.component('CStatusDot', CStatusDot)
    app.component('CProgress', CProgress)
    app.component('CSwitch', CSwitch)
    app.component('CEmpty', CEmpty)
    app.component('CLoading', CLoading)
    app.component('CAvatar', CAvatar)
    app.component('CTabs', CTabs)
    app.component('CTabPane', CTabPane)
  }
}
