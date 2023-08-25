<template>
  <div
    class="userHandle"
    v-if="settingStore.getFullScreen"
  >
    <span class="userHandle-item">
      <el-icon><FullScreen /></el-icon>
    </span>
    <span
      class="userHandle-item"
      v-if="settingStore.getShowSettingIcon"
    >
      <el-icon @click="openOrCloseConf"><Setting /></el-icon>
    </span>
    <span
      class="userHandle-item"
    >
      <el-icon @click="openOrCloseConf"><Bell /></el-icon>
    </span>
    <span
      class="userHandle-item"
      v-if="settingStore.getShowThemeIcon"
    >
      <el-switch
        v-model="themeType"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        :style="activedStyle"
      />
    </span>
    <span class="userHandle-item">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- 用户图标和用户名 -->
          <img
            class="userIcon"
            :src="settingStore.getUserIcon"
            alt="userIcon"
          >
          <span>admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Setting, FullScreen, Sunny, Moon, Bell } from '@element-plus/icons-vue'
import { ElDropdown } from 'element-plus'
import { useSetting } from '~store/configStore'
const settingStore = useSetting()

const openOrCloseConf = () => {
  settingStore.setOpenOrClose()
}

// 主题
const themeType = ref(false)
// switch Close
const activedStyle = ref({
  '--el-switch-on-color': '#fffff',
  '--el-switch-off-color': '#000000',
  marginBottom: '5px'
})

//
</script>

<style lang="scss" scoped>
.userHandle {
  width: 70%;
  height: 40px;
  line-height: 40px;
  margin: 12px auto;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .userHandle-item {
    display: block;
    width: 20%;
    font-size: 22px;
    text-align: center;
  }
  .userHandle-item:last-child {
    width: 60%;
    padding-left: 5%;
  }
  ::v-deep(.el-dropdown) {
    width: 100%;
  }
  .el-dropdown-link {
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    outline: none;
  }

  .userIcon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 0 10px 0 0;
    vertical-align: middle;
  }
}
</style>
