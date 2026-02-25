// Carrick UI - 基于 Tailwind CSS + Lucide Vue 的组件库
import './index.css'

// 基础组件
import CButton from './components/CButton/CButton.vue'
import CCard from './components/CCard/CCard.vue'
import CModal from './components/CModal/CModal.vue'

// 自定义组件
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
import CVersionInfo from './components/CVersionInfo/CVersionInfo.vue'

// T-145 CDrawer 通用抽屉组件
import CDrawer from './components/CDrawer/CDrawer.vue'

// 导出组件
export {
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
  CStatusDot,
  CProgress,
  CSwitch,
  CEmpty,
  CLoading,
  CAvatar,
  CTabs,
  CTabPane,
  CVersionInfo,
  
  // T-145 CDrawer
  CDrawer
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
    app.component('CVersionInfo', CVersionInfo)
    
    // T-145 CDrawer
    app.component('CDrawer', CDrawer)
  }
}
