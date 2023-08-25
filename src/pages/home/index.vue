<template>
  <div class="homePage">
    <form-comp :form-conf="forms" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import FormComp from '~comp/common/FormSearch/index.vue'
import { IFormConfItem } from '~types/components'

// import { getLoginInfo } from '~api/login'

const forms: Array<IFormConfItem> = [
  {
    label: '用户名',
    key: 'userName',
    type: 'InputComp',
    placeholder: '请输入用户名'
  },
  {
    label: '类型',
    key: 'userType',
    type: 'SelectComp',
    placeholder: '请选择类型',
    options: [
      {
        value: 'Option1',
        label: 'Option1'
      },
      {
        value: 'Option2',
        label: 'Option2'
      }
    ]
  },
  {
    label: '开始日期',
    key: 'dateStart',
    type: 'DateComp',
    placeholder: '请选择日期'
  },
  {
    label: '结束日期',
    key: 'dateEnd',
    type: 'DateComp',
    placeholder: '请选择日期'
  }
]
onMounted(() => {
  // getLoginInfo({ userName: '123', passWord: '1111' })
})

</script>

<style lang="scss" scoped>
.homePage{
  width: 100%;
  height: 100%;
  display: flex;
  padding: 16px;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
