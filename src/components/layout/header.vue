<template>
  <div class="layout-header">
    <span class="layout-header-logo">
      <img
        class="header-logo-ctx"
        :src="settingStore.getLogoImg"
        alt="LOGO"
      >
    </span>
    <section class="header-child-menu">
      <section class="childMenuLeft" />
      <section class="childMenuCenter">
        <child-menu v-if="settingStore.getShowHeaderMenu" />
      </section>
      <section class="childMenuRight">
        <user-handle />
      </section>
    </section>
  </div>
</template>
<script lang="ts" setup>
import ChildMenu from './headerChildMenu.vue'
import UserHandle from './userHandle.vue'
import { useSetting } from '~store/configStore'
const settingStore = useSetting()
//
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  .layout-header-logo {
    display: block;
    max-width: 200px;
    width: 200px;
    padding: 5px;
    .header-logo-ctx {
      display: block;
      width: 100%;
      height: 50px;
      transform: scale-Y(0.9);
    }
  }
  .header-child-menu {
    width: calc(100% - 200px);
    display: grid;
    grid-template-columns: 40% 40% 20%;
    height: 60px;
  }
  .childMenuRight {
    // border:1px solid white;
    line-height: 60px;
  }
}
</style>
