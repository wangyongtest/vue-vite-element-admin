<template>
  <!--纵向布局-->
  <div
    :style="{ height: `${themeConfig.showTag ? 90 : 50}px` }"
    v-if="themeConfig.fixedHeader"
  />
  <div class="g-container-layout">
    <Sidebar />
    <div class="main-container">
      <HeaderVertical />
      <Main />
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Sidebar from '../components/sideBar/index.vue'
import HeaderVertical from './header.vue'
import Main from '../components/main/index.vue'
import Footer from '../components/footer/index.vue'
import { userSettingStore } from '~store/settings'
const SettingStore = userSettingStore()
const themeConfig = computed(() => SettingStore.themeConfig)
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
