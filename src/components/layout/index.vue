<template>
  <div
    class="g-container-layout"
    :class="classObj"
  >
    <component :is="LayoutComponents[themeConfig.mode]" />
    <Theme />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import type { Component } from 'vue'
import Theme from '~comp/theme/index.vue'
import { userSettingStore } from '~store/settings'
import { useResizeHandler } from '~hooks/useResizeHandler'
import LayoutVertical from './LayoutVertical/index.vue'
import LayoutColumns from './LayoutColumns/index.vue'

const SettingStore = userSettingStore()
const themeConfig = computed(() => SettingStore.themeConfig)

interface ILayoutCom {
  [key:string]: Component
}

const LayoutComponents:ILayoutCom = {
  vertical: LayoutVertical,
  columns: LayoutColumns
}

// 是否折叠
// const isCollapse = computed(() => {
//   return !SettingStore.isCollapse
// })

const { device } = useResizeHandler()

watch(() => device.value, (val) => {
  const vertical = val === 'mobile' ? 'vertical' : themeConfig.value.mode
  const body = document.body as HTMLElement
  body.setAttribute('class', `layout-${vertical}`)
}, {
  immediate: true
})

// 当屏幕切换的时候进行变换
const classObj = computed(() => {
  return {
    hideSidebar: !SettingStore.isCollapse,
    openSidebar: SettingStore.isCollapse,
    withoutAnimation: SettingStore.withoutAnimation,
    mobile: device.value === 'mobile'
  }
})

</script>

<style lang="scss" scoped>
  .g-container-layout {
    width: 100%;
    height: 100%;

    .main-container {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .sidebar-container {
    display: flex;
    flex-direction: column;
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    z-index: 90;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
  }
</style>
