<template>
  <el-date-picker
    v-model="dateValue"
    :type="itemConf?.compType"
    :placeholder="itemConf?.placeholder"
    :default-value="itemConf?.defaultValue"
    value-format="YYYY-MM-DD "
    @change="handlerChange"
    class="fullClass"
    :teleported="false"
  />
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
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

const dateValue = ref('')

const emits = defineEmits(['update:modelValue'])

const handlerChange = (val: string) => {
  emits('update:modelValue', val)
}
</script>

<style lang="scss">
.fullClass {
  width: 100% !important;
}
</style>
