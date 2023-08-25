<template>
  <el-input
    :model-value="modelValue"
    :placeholder="itemConf?.type"
    @input="handlerChange"
    class="fullStyle"
  />
</template>

<script setup lang="ts">
//
import { PropType } from 'vue'
import { IFormConfItem } from '~types/components'
defineProps({
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

const handlerChange = (e: HTMLInputElement) => {
  console.log(e)

  emits('update:modelValue', e)
}
</script>

<style lang="scss" scoped>
.fullStyle {
  width: 100%;
}
</style>
