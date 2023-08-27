<template>
  <div class="main-columns">
    <div class="layout-columns-aside">
      <div class="logo flex-center">
        <img
          :src="logo"
          alt="logo"
        >
      </div>
      <el-scrollbar>
        <div class="menu-wrap">
          <div
            class="item-menu-wrap"
            :class="{
              'active-menu': activeCurrentMenu === item.path,
            }"
            v-for="item in menusRoutes"
            :key="item.path"
            @click="handleChangeMenu(item)"
          >
            <el-icon :size="20">
              <component
                v-if="item.meta?.icon"
                :is="item.meta?.icon"
              />
            </el-icon>
            <span class="title">{{ item?.meta?.title }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div
      class="layout-columns-sub"
      :style="{ width: isCollapse ? '60px' : '210px' }"
    >
      <div class="logo flex-center">
        <span v-show="subMenus.length">{{ isCollapse ? 'Vue' : 'Vue Admin Perfect' }}</span>
      </div>
      <el-scrollbar>
        <el-menu
          :collapse="isCollapse"
          :router="false"
          :default-active="activeMenu"
          :unique-opened="SettingStore.themeConfig.uniqueOpened"
          :collapse-transition="false"
          class="menu-columns"
        >
          <SubMenu :menu-list="subMenus" />
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="container">
      <div class="layout-header">
        <div class="header-tool">
          <HeaderToolLeft />
          <HeaderToolRight />
        </div>
        <TagsView v-if="themeConfig.showTag" />
      </div>
      <Main />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermissionStore } from '~store/permission'
import { userSettingStore } from '~store/settings'
import Footer from '../components/footer/index.vue'
import SubMenu from '../components/submenu/subMenu.vue'
import TagsView from '../components/tagsView/index.vue'
import HeaderToolRight from '../components/headerRight.vue'
import HeaderToolLeft from '../components/headerLeft.vue'
import Main from '../components/main/index.vue'

import logo from '~assets/images/logo.webp'

const PermissionStore = usePermissionStore()
const SettingStore = userSettingStore()
const route = useRoute()
const router = useRouter()

// 获取路由
const menusRoutes = computed(() => {
  return PermissionStore.permission_routes.filter((item) => !item.hidden)
})

const activeCurrentMenu = ref('')
// 主题配置
const themeConfig = computed(() => SettingStore.themeConfig)
const isCollapse = computed(() => !SettingStore.isCollapse)
const activeMenu = computed(() => {
  const { path } = route
  return path
})
const basePath = ref<string>('/')
const subMenus:Ref<any[]> = ref([])

watch(
  () => [route],
  () => {
    if (!menusRoutes.value.length) return
    const [firstMenu] = route.matched
    activeCurrentMenu.value = firstMenu.path
    const menuItem = menusRoutes.value.find((item) => firstMenu.path === item.path)
    if (menuItem && menuItem.children?.length) {
      subMenus.value = menuItem.children
    } else {
      subMenus.value = []
    }
    basePath.value = firstMenu.path
  },
  {
    deep: true,
    immediate: true
  }
)

const handleChangeMenu = (item:any) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>

  .main-columns {
    display: flex;
    flex-direction: row !important;
    width: 100%;
    height: 100%;
  }

  .layout-columns-aside {
    flex-shrink: 0;
    width: 80px;
    height: 100%;
    background-color: #304156;

    .el-scrollbar {
      height: calc(100% - 55px);
    }

    .logo {
      box-sizing: border-box;
      height: 50px;

      img {
        width: 32px;
        object-fit: contain;
      }
    }

    .menu-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .item-menu-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .active-menu {
        background: $primaryColor;
        border-radius: 5px;
      }

      .title {
        color: #e5eaf3;
      }

      .el-icon {
        color: #e5eaf3;
      }
    }
  }

  .layout-columns-sub {
    box-sizing: border-box;
    flex-direction: column;
    flex-shrink: 0;
    width: 200px;
    overflow: hidden;
    background: white;
    border-right: 1px solid #eee;
    transition: all 0.3s ease;

    .el-scrollbar {
      height: calc(100vh - 50px);
    }

    .logo {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #eee;

      span {
        font-weight: bold;
        white-space: nowrap;
      }
    }

    ::v-deep(.menu-columns) {
      border-right: none;
    }
  }

  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }

  .layout-header {
    box-sizing: border-box;
    flex-shrink: 0;
    background: white;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: width 0.28s;

    .header-tool {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      padding: 0 10px 0 0;
      border-bottom: 1px solid #eee;
    }
  }
</style>
