<template>
  <div class="formLayout">
    <el-form
      :model="form"
      :rules="rulesConf"
      :label-width="labelWidth"
    >
      <el-row :gutter="gutter">
        <el-col
          :span="8"
          v-for="item in formConf"
          :key="item.key"
        >
          <el-form-item :label="item.label">
            <component
              :item-conf="item"
              :is="compsList[item.type]"
              v-model="form[item.key]"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button
              type="primary"
              @click="handlerSearch"
            >
              查询
            </el-button>
            <el-button @click="handlerReset">
              重置
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from 'vue'
// 这里使用封包、拆包处理form数据。原理：当我们传入 配置项时，组件根据传入的值记性拆包，数据变动进行封包返回数据
import { IFormConfItem, IFormRulesItem } from '~types/components'
import InputComp from './components/inputItem.vue'
import SelectComp from './components/selectItem.vue'
import DateComp from './components/dateRange.vue'

// 组件列表
const compsList: any = {
  InputComp,
  SelectComp,
  DateComp
}

// 接收参数
const props = defineProps({
  formConf: {
    type: Array as PropType<IFormConfItem[]>,
    required: true
  },
  rulesConf: {
    type: Array as PropType<IFormRulesItem[]>,
    default: () => []
  },
  gutter: {
    type: Number,
    default: () => 20
  },
  labelWidth: {
    type: String,
    default: () => '80px'
  }
})

// 定义标识，是否初次渲染
const initFlag = ref(true)

// 解包，吧传入的值拆解为form对象
const form: any = ref({})
// !这里要监听两个值变化： formConf & initFlag(使用重置按钮) 要重新处理
watch(
  [() => props.formConf, () => initFlag.value],
  ([newFormConf, newInitFlag]) => {
    newFormConf?.forEach((item: IFormConfItem) => {
      // !这里确认 defaultValue 必须有 为空是可以为空字符串或者 空数组
      form.value[item.key] = item.defaultValue || ''
    })
  },
  {
    immediate: true
  }
)

// 更新数据
watch(
  () => form.value,
  newVal => {
    console.log(newVal, 'watch')
  },
  {
    deep: true
  }
)

const handlerSearch = () => {}
const handlerReset = () => {}
</script>

<style lang="scss" scoped>
.formLayout {
  width: 85%;
}
</style>
