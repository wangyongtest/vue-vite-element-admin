<template>
  <div
    class="hamburger-container"
    @click="handleCollapse"
  >
    <el-icon
      class="icon"
      v-if="isCollapse"
    >
      <expand />
    </el-icon>
    <el-icon
      class="icon"
      v-else
    >
      <fold />
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { userSettingStore } from '~store/settings'
const SettingStore = userSettingStore()
const isCollapse = computed(() => !SettingStore.isCollapse)
const handleCollapse = () => {
  SettingStore.setCollapse(isCollapse.value)
}
</script>
  <style lang="scss" scoped>
    .hamburger-container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 15px;

      &:hover {
        background: rgb(0 0 0 / 2.5%);
      }

      .icon {
        font-size: 24px;
        cursor: pointer;
      }
    }
  </style>
