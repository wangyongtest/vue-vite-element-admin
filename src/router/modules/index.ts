import Layout from '~comp/layout/index.vue'

import { RouterList } from '~types/router'
import { aboutRoutes } from './about'

// 异步组件
export const asyncRoutes:RouterList = [
  ...aboutRoutes
]

export const routeList:RouterList = [
  {
    path: '/',
    name: 'layout',
    redirect: '/index',
    meta: { title: '首页', icon: 'House' },
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('~pages/home/index.vue'),
        name: 'index',
        meta: {
          title: '首页',
          icon: 'House',
          affix: true,
          role: ['other']
        }
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    component: () => import('~pages/errorPages/403.vue'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../../pages/notFound/index.vue'),
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('~pages/login/index.vue'),
    hidden: true,
    meta: { title: '登录' }
  }
]

// notFoundRouter(找不到路由)
export const notFoundRouter = {
  path: '/:pathMatch(.*)',
  name: 'notFound',
  redirect: '/404'
}
