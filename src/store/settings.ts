import { defineStore } from 'pinia'

export type IThemeConfig = {
    // 显示设置
    showSetting?: boolean
    // 菜单展示模式 默认 vertical   horizontal / vertical /columns
    mode?: string
    // tagsView 是否展示 默认展示
    showTag?: boolean
    // 页脚
    footer?: boolean
    // 深色模式 切换暗黑模式
    isDark?: boolean
    // 显示侧边栏Logo
    showLogo?: boolean
    // 主题颜色
    primary?: string
    // element组件大小
    globalComSize?: string
    // 是否只保持一个子菜单的展开
    uniqueOpened?: boolean
    // 固定header
    fixedHeader?: boolean
    // 灰色模式
    gray?: boolean
    // 色弱模式
    weak?: boolean
}

interface ISideBar {
  withoutAnimation:boolean
}

interface IThemeKey {
 [key:string]: string | boolean
}

export const userSettingStore = defineStore('userSetting', {
  state: () => {
    return {
      // menu 是否收缩
      isCollapse: true,
      // 登录token
      token: null,
      //
      withoutAnimation: false,
      device: 'desktop',
      // 登录用户信息
      userInfo: {},
      // 刷新当前页
      isReload: true,
      // 主题设置
      themeConfig: {
        // 显示设置
        showSetting: false,
        // 菜单展示模式 默认 vertical   horizontal / vertical /columns
        mode: 'vertical',
        // tagsView 是否展示 默认展示
        showTag: true,
        // 页脚
        footer: true,
        // 深色模式 切换暗黑模式
        isDark: false,
        // 显示侧边栏Logo
        showLogo: true,
        // 主题颜色
        primary: '#409eff',
        // element组件大小
        globalComSize: 'default',
        // 是否只保持一个子菜单的展开
        uniqueOpened: true,
        // 固定header
        fixedHeader: true,
        // 灰色模式
        gray: false,
        // 色弱模式
        weak: false
      }
    }
  },
  getters: {
    getCollapse: (state) => state.isCollapse,
    getToken: state => state.token,
    getUserInfo: state => state.userInfo,
    getLoadCurrent: state => state.isReload,
    getThemeConfig: state => state.themeConfig
  },
  actions: {
    setCollapse (payload:boolean) {
      this.isCollapse = payload
      this.withoutAnimation = false
    },
    setToken (payload: string) {
      this.token = payload as unknown as null
    },
    setUserInfo (payload:any) {
      this.userInfo = payload
    },
    setCurrentPageReload (payload:boolean) {
      this.isReload = payload
      setTimeout(() => {
        this.isReload = true
      }, 50)
    },
    setThemeConfig (payload:IThemeKey) {
      this.themeConfig = {
        ...this.themeConfig,
        ...payload
      }
    },
    // 关闭侧边栏
    closeSideBar ({ withoutAnimation }:ISideBar) {
      this.isCollapse = false
      this.withoutAnimation = withoutAnimation
    },
    toggleDevice (device:string) {
      this.device = device
    },
    // 刷新
    setReload () {
      this.isReload = false
      setTimeout(() => {
        this.isReload = true
      }, 50)
    }
  }
})
