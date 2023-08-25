import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import { registerElIcons } from './plugins/icons'

// element-plus UI库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// svg-icons注册导入（l了解用法）
import 'virtual:svg-icons-register'
import SvgIcon from '~comp/common/SvgIcon/index.vue'// svg component

// 引入暗黑模式 element-plus 2.2 内置暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义暗黑模式
import '~styles/element-dark.scss'
// 自定义样式
import '~styles/index.scss'
// 引入阿里图标库
import '~assets/iconfont/iconfont.css'
import '~assets/iconfont/iconfont.js'

const store = createPinia()

const app = createApp(App)
registerElIcons(app)

app.component('SvgIcon', SvgIcon)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
