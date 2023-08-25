import { defineStore } from 'pinia'
import router from '../router/index'
import { RouteRecord } from 'vue-router'
export interface IVisiteViews {
  activeTabsValue: string
  visitedViews: RouteRecord[]
  cachedViews: RouteRecord[]
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
    addView (view:RouteRecord) {
      this.addVisitedView(view)
    },
    removeView (routes:RouteRecord[]) {
      return new Promise((resolve, reject) => {
        this.visitedViews = this.visitedViews.filter((item) => !routes.includes(item.path))
        resolve(null)
      })
    },
    addVisitedView (view:RouteRecord) {
      this.setTabsMenuValue(view.path)

      if (this.visitedViews.some((v) => v.path === view.path)) return

      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
      if (view.meta.keepAlive) {
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
      const index = this.visitedViews.findIndex((item) => item.path === activeTabPath)
      const nextTab = this.visitedViews[index + 1] || this.visitedViews[index - 1]
      if (!nextTab) return
      router.push(nextTab.path)
      this.addVisitedView(nextTab)
    },
    delVisitedView (path:string) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.path !== path || v.meta.affix
        })
        this.cachedViews = this.cachedViews.filter((v) => {
          return v.path !== path || v.meta.affix
        })
        resolve([...this.visitedViews])
      })
    },
    delCachedView (view) {
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
        this.visitedViews = this.visitedViews.filter((v) => v.meta.affix)
        this.cachedViews = this.visitedViews.filter((v) => v.meta.affix)
        resolve([...this.visitedViews])
      })
    },
    delOtherViews (path) {
      this.visitedViews = this.visitedViews.filter((item) => {
        return item.path === path || item.meta.affix
      })
      this.cachedViews = this.visitedViews.filter((item) => {
        return item.path === path || item.meta.affix
      })
    },
    goHome () {
      this.activeTabsValue = '/home'
      router.push({ path: '/home' })
    },
    updateVisitedView (view) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})
