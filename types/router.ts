import { DefineComponent, Component } from 'vue'

type IRouterItemMeta = {
    icon: string
    auth: string
}

export interface IRouterItem {
    path: string,
    name: string,
    meta: IRouterItemMeta
    component: Component | DefineComponent
}

// 扩展继承属性
export interface extendRoute {
    hidden?: boolean
  }
