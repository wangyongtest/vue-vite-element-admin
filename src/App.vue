<template>
  <el-config-provider
    :size="globalComSize"
    :locale="zhCn"
  >
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { userSettingStore } from '~store/settings'
// 配置element中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const SettingStore = userSettingStore()
// 配置全局组件大小
const globalComSize = computed(():string => SettingStore.themeConfig.globalComSize)
</script>

  <style lang="scss">
    #app {
      position: relative;
      width: 100%;
      height: 100%;
      font-family: Avenir, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
    }

    .el-pager li:focus {
      border: none;
    }

    .el-dropdown:focus {
      border: none;
    }

    .svg-icon:focus {
      border: none;
    }
  </style>
