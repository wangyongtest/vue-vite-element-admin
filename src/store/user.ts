import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      // 登录token
      token: null,
      // 登录用户信息
      userInfo: {},
      // 角色
      roles: localStorage.roles ? JSON.parse(localStorage.roles) : []
    }
  },
  getters: {},
  actions: {
    // 登录:
    // !这里场景分两种： 用户名密码 || 扫码
    login (userInfo:any) {
      const { username } = userInfo
      return new Promise(async (resolve, reject) => {
        try {
          this.token = username
          this.userInfo = userInfo
          await this.getRoles()
          resolve(username)
        } catch (error) {
          reject(error)
        }
      })
    },
    // 获取用户授权角色信息，实际应用中 可以通过token通过请求接口在这里获取用户信息
    getRoles () {
      return new Promise((resolve, reject) => {
        // 获取权限列表 默认就是超级管理员，因为没有进行接口请求 写死
        this.roles = ['admin']
        localStorage.roles = JSON.stringify(this.roles)
        resolve(this.roles)
      })
    },
    // 获取用户信息 ，如实际应用中 可以通过token通过请求接口在这里获取用户信息
    getInfo (roles:any) {
      return new Promise((resolve, reject) => {
        this.roles = roles
        resolve(roles)
      })
    },
    // 退出
    logout () {
      return new Promise((resolve, reject) => {
        this.token = null
        this.userInfo = {}
        this.roles = []
        resolve(null)
      })
    }
  }
})
