<template>
  <el-menu-item
    :index="subItem.path"
    @click="handleClickMenu(subItem)"
  >
    <el-icon>
      <component :is="subItem?.meta?.icon" />
    </el-icon>
    <template #title>
      <span>{{ subItem?.meta?.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { isExternal } from '~utils/validate'

const router = useRouter()
defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  subItem: {
    type: Object,
    default: () => {}
  }
})

const handleClickMenu = (subItem:any) => {
  if (isExternal(subItem.path)) return window.open(subItem.path, '_blank')
  router.push(subItem.path)
}
</script>
