import { defineStore } from 'pinia'

export const useSetting = defineStore('settingConfig', {
  state: () => {
    return {
      // header
      logoImgUrl: '/images/logo.webp', // logo
      userIcon: '/images/user.webp', // 用户图像，上传则更新，否则使用默认
      isFullScreen: true, // 是否全屏
      showHeaderMenu: true, // 展示头部的菜单
      showTags: true, // 展示tag
      showSettingIcon: true, // 展示配置按钮
      showThemeIcon: true, // 主题按钮
      openSettingDialog: false // 右侧配置弹框
    }
  },
  getters: {
    getLogoImg: state => state.logoImgUrl,
    getUserIcon: state => state.userIcon,
    getFullScreen: state => state.isFullScreen,
    getShowHeaderMenu: state => state.showHeaderMenu,
    getShowTags: state => state.showTags,
    getShowThemeIcon: state => state.showThemeIcon,
    getShowSettingIcon: state => state.showSettingIcon,
    getIsOpen: (state) => state.openSettingDialog
  },
  actions: {
    setUserIcon (payload: string): void {
      this.userIcon = payload
    },
    setFullScreen (payload: boolean) {
      this.isFullScreen = payload
    },
    setShowHeaderMenu (payload: boolean) {
      this.showHeaderMenu = payload
    },
    setShowTags (payload: boolean) {
      this.showTags = payload
    },
    setShowSettingIcon (payload: boolean) {
      this.showSettingIcon = payload
    },
    setShowThemeIcon (payload: boolean) {
      this.showThemeIcon = payload
    },
    setOpenOrClose () {
      this.openSettingDialog = !this.openSettingDialog
    }
  }
})
