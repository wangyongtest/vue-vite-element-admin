import { createRouter, createWebHashHistory } from 'vue-router'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { routeList } from './modules/index'
import { useUserStore } from '~store/user'
import { usePermissionStore } from '~store/permission'

// 进度条配置
NProgress.configure({ showSpinner: false })

// 设置白名单 login 不需要权限
const whiteList = ['/login', '/auth-redirect']

const router = createRouter({
  history: createWebHashHistory(),
  routes: routeList
})

// 记录路由
// let hasRoles = true

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 设置标题
  if (typeof (to.meta.title) === 'string') {
    document.title = to.meta.title || 'vue-admin-admin'
  }

  const UserStore = useUserStore()
  // 确定用户是否已登录过，存在Token
  const hasToken = UserStore.token
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
    } else {
      try {
        const PermissionStore = usePermissionStore()
        // 路由添加进去了没有及时更新 需要重新进去一次拦截
        if (!PermissionStore.routes.length) {
          // 获取权限列表进行接口访问 因为这里页面要切换权限
          const accessRoutes = await PermissionStore.generateRoutes(UserStore.roles)
          // hasRoles = false
          // 动态添加访问路由表
          accessRoutes.forEach(item => router.addRoute(item))
          // 这里相当于push到一个页面 不在进入路由拦截
          next({ ...to, replace: true })
        } else {
          // 如果不传参数就会重新执行路由拦截，重新进到这里
          next()
        }
      } catch (error) {
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
export default router
