<template>
  <!--纵向布局-->
  <div
    class="m-layout-header"
    :class="{
      'fixed-header': themeConfig.fixedHeader,
      collapse: themeConfig.fixedHeader && isCollapse,
      'no-collapse': themeConfig.fixedHeader && !isCollapse,
    }"
  >
    <div class="header-inner">
      <HeaderToolLeft />
      <HeaderToolRight />
    </div>
    <TagsView v-if="themeConfig.showTag" />
  </div>
</template>

<script lang="ts" setup>
// 引入组件
import HeaderToolRight from '../components/headerRight.vue'
import HeaderToolLeft from '../components/headerLeft.vue'
import TagsView from '../components/tagsView/index.vue'

import { computed } from 'vue'
import { userSettingStore } from '~store/settings'
const SettingStore = userSettingStore()

// 主题配置
const themeConfig = computed(() => SettingStore.themeConfig)
const isCollapse = computed(() => !SettingStore.isCollapse)
</script>

  <style lang="scss" scoped>

.show-tag{
  height: 90px;
}

.zb-no-fixed-header{
  width: 100%!important;;
}

.m-layout-header {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  background: white;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: width 0.28s;

  .header-inner {
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

.mobile {
  .m-layout-header {
    left: 0 !important;
    width: 100%!important;
  }
}

.fixed-header{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
}

.collapse{
  width: calc(100% - 60px);
}

.no-collapse{
  width: calc(100% - 210px);
}

.el-dropdown {
  display: flex;
  align-items: center;
  height: 100%;
}

.transverseMenu{
  display: flex;

  .el-menu{
    overflow: hidden;
  }

  ::v-deep(.el-menu-item){
    height: 100% !important;
  }

  .tool-bar-right{
    display: flex;
    flex-shrink: 0;
    justify-content: flex-end;
    min-width:300px ;
  }
}

  </style>
