import { ref } from 'vue'

export const useConfig = () => {
  const showConfigVisable = ref(false)
  const direction = ref('rtl')

  const closeUseConfig = () => {
    showConfigVisable.value = false
  }

  const openUseConfig = () => {
    showConfigVisable.value = true
  }

  return {
    showConfigVisable,
    direction,
    closeUseConfig,
    openUseConfig
  }
}
