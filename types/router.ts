import { DefineComponent, Component } from 'vue'

type IRouterItemMeta = {
    icon?: string
    auth?: string
    title?: string
    affix?:string | boolean
    role?: Array<string>
    breadcrumb?: boolean
    keepAlive?: boolean
}

export interface IRouterItem {
    path?: string
    name?: string
    meta?: IRouterItemMeta
    alwaysShow?: boolean
    redirect?: string
    hidden?: boolean
    keepAlive?:boolean
    component?: Component | DefineComponent
    children?: Array<IRouterItem>
}

// 扩展继承属性
export interface extendRoute {
    hidden?: boolean
  }

export type RouterList = Array<IRouterItem>
