import { ElLoading } from 'element-plus'

interface IELoading {
  text?: string
  close?:()=> void
}
let loading: any
export const openLoading = (options:IELoading = {}) => {
  const text = options.text || '加载中'
  loading = ElLoading.service({
    lock: true,
    text
  })
}
export const closeLoading = () => {
  loading && loading.close()
}
