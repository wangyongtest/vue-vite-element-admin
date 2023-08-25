import { computed } from 'vue'

export const useFormItem = (props: any) => {
  const setSelectOptions = computed(() => {
    return props.itemConf?.options
  })

  return {
    setSelectOptions
  }
}
