import Layout from '~comp/layout/index.vue'
export const aboutRoutes = [
  {
    path: '/about',
    name: 'About',
    redirect: '/about/index',
    meta: { title: '关于', icon: 'House' },
    component: Layout,
    children: [
      {
        path: '/about/index',
        component: () => import('~pages/about/index.vue'),
        name: 'AboutIndex',
        meta: {
          title: '关于',
          icon: 'House',
          affix: true,
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
          affix: true,
          role: ['other']
        }
      }
    ]
  }
]
