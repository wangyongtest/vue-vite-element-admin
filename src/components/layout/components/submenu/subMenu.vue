<template>
  <template
    v-for="subItem in menuList"
    :key="subItem.path"
  >
    <template v-if="!subItem.hidden">
      <template v-if="!subItem.alwaysShow&&hasOneChild(subItem.children, subItem)">
        <MenuItem
          :sub-item="hasOneChild(subItem.children, subItem)"
        />
      </template>
      <el-sub-menu
        v-else
        :index="subItem.path"
      >
        <template #title>
          <el-icon v-if="subItem?.meta?.icon">
            <component :is="subItem?.meta?.icon" />
          </el-icon>
          <span>{{ subItem?.meta?.title }}</span>
        </template>
        <SubMenu :menu-list="subItem.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import MenuItem from './menuItem.vue'
import { RouterList } from '~types/router'

defineProps({
  menuList: {
    type: Array as PropType<Record<string, any>>,
    default: () => []
  }
})

const hasOneChild = (children:RouterList = [], parent:RouterList = []):any => {
  const showingChildren = children.filter((item) => {
    // 过滤掉需要隐藏的菜单
    if (item.hidden) {
      return false
    } else {
      return true
    }
  })
  // 当只有一个子路由器时，默认情况下会显示该子路由器
  if (showingChildren.length === 1) {
    // （如果只有一个显示子项，则将使用）
    return showingChildren[0]
  }
  // 如果没有要显示的子路由器，则显示父路由器
  if (showingChildren.length === 0) {
    return parent
  }
  return false
}

</script>
