import { RouterList, IRouterItem } from '~types/router'
import path from 'path-browserify'

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes:RouterList, roles:string[]) {
  const result:RouterList = []
  routes.forEach(route => {
    const tmp:IRouterItem = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      result.push(tmp)
    }
  })
  return result
}

/**
 * 使用 meta.role 来确定当前用户是否具有权限
 * @param roles
 * @param route
 */
export function hasPermission (roles:string[], route:IRouterItem) {
  if (route.meta && route.meta.role) {
    return roles.some(role => (route.meta && route.meta.role)!.includes(role))
  } else {
    return false
  }
}

/**
 * @description 使用递归，过滤需要缓存的路由
 * @param {Array} _route 所有路由表
 * @param {Array} _cache 缓存的路由表
 * @return void
 * */

export function filterKeepAlive (routers:RouterList) {
  const cacheRouter: Array<string> = []
  const deep = (routers:Array<IRouterItem>) => {
    routers.forEach(item => {
      if (item.meta?.keepAlive && item.name) {
        cacheRouter.push(item.name)
      }
      if (item.children && item.children.length) {
        deep(item.children)
      }
    })
  }
  deep(routers)
  return cacheRouter
}

export function filterAffixTags (routes:any, basePath = '/') {
  let tags:any = []
  routes.forEach((route:any) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

type IData = {
  path: string
  title: string[]
}

// 筛选出可以在侧栏中显示的路线 生成标题
export const generateRoutes = (routes:any, basePath = '/', prefixTitle = []):RouterList => {
  let res:RouterList = []
  for (const router of routes) {
    // 忽略隐藏的路由
    if (router.hidden) {
      continue
    }
    const data:IData = {
      path: path.resolve(basePath, router.path),
      title: [...prefixTitle]
    }
    if (router.meta && router.meta.title) {
      data.title = [...data.title, router.meta.title]

      if (router.redirect !== 'noRedirect') {
        // 仅推送带有标题的路由
        // 特殊情况：需要排除无重定向的父路由器
        res.push(data)
      }
    }
    // 递归子路由
    if (router.children) {
      const tempRoutes = generateRoutes(router.children, data.path, data.title = [])
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
