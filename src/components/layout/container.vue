<template>
  <div class="layout-container">
    <container-nav-bar v-if="settings.getShowTags" />
    <div class="context">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ContainerNavBar from './naverBar.vue'
import { useSetting } from '~store/configStore'

const settings = useSetting()
//
</script>

<style lang="scss" scoped>
.context {
  color: #000000;
}
</style>
