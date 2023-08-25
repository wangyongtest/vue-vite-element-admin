<template>
  <div class="setting-config">
    <div
      class="setting-config-row"
      v-for="item in configItems"
      :key="item.key"
    >
      <span class="setting-config-row__label">{{ item.label }}</span>
      <el-switch
        v-model="item.value"
        :disabled="item.disabled"
        @change="(isOpen:boolean) => openOrClose(item.key, isOpen)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSetting } from '~store/configStore'

// 定义配置项
const configItems = ref([
  {
    label: '展示全屏',
    value: true,
    key: 'fullScreen',
    size: 'default',
    disabled: false
  },
  {
    label: '配置',
    value: true,
    key: 'settings',
    size: 'default',
    disabled: false
  },
  {
    label: '主题',
    value: true,
    key: 'showTheme',
    size: 'default',
    disabled: false
  },
  {
    label: 'tags',
    value: true,
    key: 'showTags',
    size: 'default',
    disabled: false
  },
  {
    label: 'headerMenu',
    value: true,
    key: 'headerChildMenu',
    size: 'default',
    disabled: false
  }
])

const useSettings = useSetting()

const openOrClose = (type: string, isOpen: boolean) => {
  console.log(type, isOpen)
  switch (type) {
    case 'fullScreen': {
      // 展示全屏按钮
      useSettings.setFullScreen(isOpen)
      break
    }
    case 'settings': {
      // 展示配置按钮
      useSettings.setShowSettingIcon(isOpen)
      break
    }
    // 展示tags
    case 'showTags': {
      useSettings.setShowTags(isOpen)
      break
    }
    // 展示头部menu
    case 'headerChildMenu': {
      useSettings.setShowHeaderMenu(isOpen)
      break
    }
    default: {
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-config {
  width: 100%;
  & .setting-config-row {
    display: grid;
    // grid-template-rows: 1fr auto;
    grid-template-columns: 200px auto;
    text-align: left;
  }
}
</style>
