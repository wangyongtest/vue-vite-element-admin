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
            :is="useWrapComponents(Component, route)"
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
      box-sizing: border-box;
      display: flex;
      flex: 1;
      width: 100%;
      overflow-x: hidden;

      .app-main-inner{
        box-sizing: border-box;
        display: flex;
        flex: 1;
        width: 100%;
        overflow-x: hidden;
      }
    }
  </style>
