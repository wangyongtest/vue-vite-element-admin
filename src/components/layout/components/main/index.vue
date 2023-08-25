<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition
        name="fade-slide"
        mode="out-in"
        appear
      >
        <keep-alive
          :include="cacheRoutes"
          v-if="isReload"
        >
          <component
            :is="useWrapComponents(Component,route)"
            :key="route.path"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useWrapComponents } from '~hooks/useWrapComponents'
import { computed } from 'vue'
import { userSettingStore } from '~store/settings'
import { usePermissionStore } from '~store/permission'
const SettingStore = userSettingStore()
const PermissionStore = usePermissionStore()
const cacheRoutes = computed(() => PermissionStore.keepAliveRoutes)
const isReload = computed(() => SettingStore.isReload)
</script>

  <style lang="scss" scoped>
    .app-main {
      flex: 1;
      display: flex;
      overflow-x: hidden;
      width: 100%;
      box-sizing: border-box;
      .app-main-inner{
        flex: 1;
        display: flex;
        overflow-x: hidden;
        width: 100%;
        box-sizing: border-box;
      }
    }
  </style>
