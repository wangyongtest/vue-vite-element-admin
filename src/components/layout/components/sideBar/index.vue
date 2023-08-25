<template>
  <div
    class="sidebar-container"
    :class="{ 'has-logo': themeConfig.showLogo }"
  >
    <Logo
      :is-collapse="isCollapse"
      v-if="themeConfig.showLogo"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="SettingStore.themeConfig.uniqueOpened"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <SubItem
          v-for="routeItem in permissionRoutes"
          :key="routeItem.path"
          :item="routeItem"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Logo from './logo.vue'
import SubItem from '../submenu/subItem.vue'
import { userSettingStore } from '~store/settings'
import { usePermissionStore } from '~store/permission'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 在setup中获取store
const route = useRoute()
const PermissionStore = usePermissionStore()
const SettingStore = userSettingStore()

// 是否折叠
const isCollapse = computed(() => !SettingStore.isCollapse)
// 设置
const themeConfig = computed(() => SettingStore.themeConfig)

// 获取路由
const permissionRoutes = computed(() => PermissionStore.permission_routes)
console.log(permissionRoutes, 'permissionRoutes')

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
}
</style>
