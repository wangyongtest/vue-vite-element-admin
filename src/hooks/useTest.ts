import { ref, reactive, toRefs, defineExpose, computed } from 'vue'

export const useTest = () => {
  const state = reactive({
    count: 0
  })
  const testBoolean = ref(false)

  const increment = () => {
    state.count++
    console.log(state, '---')
  }
  const getTestBoolean = computed(() => {
    return testBoolean.value
  })

  defineExpose({
    getTestBoolean
  })
  return {
    ...toRefs(state),
    increment,
    testBoolean
  }
}
