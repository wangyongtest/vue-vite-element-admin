import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: '',
  timeout: 3000,
  headers: { '  Content-Type': 'application/json' }
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const token: string | null = sessionStorage.getItem('token') || null
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 相应拦截器
instance.interceptors.response.use(response => {
  // 接口统一返回
  return response
}, error => {
  console.log(error, 'response-error')

  const { response } = error
  // 处理 HTTP 网络错误
  let message:string = ''

  // HTTP 状态码
  const status = response?.status

  switch (status) {
    case 401:
      message = 'token 失效，请重新登录'
      ElMessage.error(message)
      // 这里可以触发退出的 action
      break
    case 403:
      message = '拒绝访问'
      ElMessage.error(message)
      break
    case 404:
      message = '请求地址错误'
      ElMessage.error(message)
      break
    case 500:
      message = '服务器故障'
      ElMessage.error(message)
      break
    default:
      message = '网络连接故障'
      ElMessage.error(message)
  }
  return Promise.reject(error)
})

interface IResponse {
  code: number
  message: string
  data: any
}

interface IRequest<T = any> {
  headers?:AxiosHeaders
  params?: any
  data?: T
}

export const getApi = (url:string, config:AxiosRequestConfig):Promise<IResponse> => {
  return instance.get(url, config)
}

export const postApi = <T>(url:string, data:T, config:AxiosRequestConfig):Promise<IResponse> => {
  return instance.post(url, data, config)
}

export const putApi = <T>(url:string, data:T, config:AxiosRequestConfig):Promise<IResponse> => {
  return instance.post(url, data, config)
}

export const deleteApi = <T>(url:string, config:AxiosRequestConfig<IRequest<T>>):Promise<IResponse> => {
  return instance.delete(url, config)
}
