import Layout from '~comp/layout/index.vue'
export const aboutRoutes = [
  {
    path: '/about',
    name: 'About',
    redirect: '/about/index',
    meta: {
      title: '关于',
      icon: 'House',
      roles: ['other']
    },
    component: Layout,
    children: [
      {
        path: '/about/index',
        component: () => import('~pages/about/index.vue'),
        name: 'AboutIndex',
        meta: {
          title: '关于',
          icon: 'House',
          role: ['other']
        }
      },
      {
        path: '/about/detail',
        component: () => import('~pages/about/detail.vue'),
        name: 'AboutDetail',
        meta: {
          title: '相关详情',
          icon: 'House',
          // affix: true, // 配置路由注意添加后无法关闭当前页
          role: ['other']
        }
      }
    ]
  }
]
