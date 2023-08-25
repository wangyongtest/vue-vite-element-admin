<template>
  <el-select
    :model-value="modelValue"
    @change="handlerChange"
    :placeholder="itemConf?.placeholder"
    :size="itemConf?.size"
    class="fullClass"
  >
    <el-option
      v-for="item in setSelectOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { IFormConfItem } from '~types/components'
const props = defineProps({
  itemConf: {
    type: Object as PropType<IFormConfItem>,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const setSelectOptions = computed(() => {
  return props.itemConf?.options
})

const handlerChange = (e: HTMLInputElement) => {
  console.log(e)
  emits('update:modelValue', e)
}
</script>

<style lang="scss" scoped>
.fullClass {
  width: 100%;
}
</style>
