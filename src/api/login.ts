/**
 * !登录相关
 */

import { getApi } from '~utils/request'

interface IParams {
  userName: string
  passWord: string
}

export const getLoginInfo = (params:IParams) => {
  return getApi('/login', { params })
}
