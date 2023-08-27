import { defineStore } from 'pinia'
import router from '../router/index'
import { IRouterItem, RouterList } from '~types/router'
export interface IVisiteViews {
  activeTabsValue: string
  visitedViews: RouterList
  cachedViews: RouterList
}

export const useTagsViewStore = defineStore('tagsViewState', {

  // state: 返回对象的函数
  state: ():IVisiteViews => ({
    activeTabsValue: '/home',
    visitedViews: [],
    cachedViews: []
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    setTabsMenuValue (val:string) {
      this.activeTabsValue = val
    },
    addView (view:IRouterItem) {
      this.addVisitedView(view)
    },
    removeView (routes:any) {
      return new Promise((resolve, reject) => {
        this.visitedViews = this.visitedViews.filter((item) => !routes.includes(item.path))
        resolve(null)
      })
    },
    addVisitedView (view:any) {
      this.setTabsMenuValue(view.path)

      if (this.visitedViews.some((v) => v.path === view.path)) return

      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
      if (view.meta?.keepAlive) {
        this.cachedViews.push(view.name)
      }
    },
    delView (activeTabPath:string) {
      return new Promise((resolve) => {
        this.delVisitedView(activeTabPath)
        this.delCachedView(activeTabPath)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    toLastView (activeTabPath:string) {
      console.log(activeTabPath, 'activeTabPath')

      const index = this.visitedViews.findIndex((item) => item.path === activeTabPath)
      const nextTab:any = this.visitedViews[index + 1] || this.visitedViews[index - 1]
      if (!nextTab) return
      router.push(nextTab.path)
      this.addVisitedView(nextTab)
    },
    delVisitedView (path:string) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.path !== path || v.meta!.affix
        })
        this.cachedViews = this.cachedViews.filter((v) => {
          return v.path !== path || v.meta!.affix
        })
        resolve([...this.visitedViews])
      })
    },
    delCachedView (view:any) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },
    clearVisitedView () {
      this.delAllViews()
    },
    delAllViews () {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => v.meta!.affix)
        this.cachedViews = this.visitedViews.filter((v) => v.meta!.affix)
        resolve([...this.visitedViews])
      })
    },
    delOtherViews (path:string) {
      console.log(path, 'delOtherViews')

      this.visitedViews = this.visitedViews.filter((item) => {
        return item.path === path || item.meta!.affix
      })
      this.cachedViews = this.visitedViews.filter((item) => {
        return item.path === path || item.meta!.affix
      })
    },
    goHome () {
      this.activeTabsValue = '/index'
      router.push({ path: '/index' })
    },
    updateVisitedView (view:IRouterItem) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})
