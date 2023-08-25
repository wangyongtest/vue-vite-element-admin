import { ElLoading } from 'element-plus'

let loading = null

export const openLoading = (options = {}) => {
  const text = options.text || '加载中'
  loading = ElLoading.service({
    lock: true,
    text
  })
}
export const closeLoading = () => {
  loading && loading.close()
}
