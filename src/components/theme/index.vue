<template>
  <div>
    <!--  !右侧定位修改主题，需要解注释 -->
    <!-- <div class="m-setting-fix">
      <div class="item">
        <div
          class="item-child"
          @click="operator(1)"
        >
          <el-icon
            size="30"
            color="#3698fd"
            style="margin-bottom: 8px"
          >
            <brush />
          </el-icon>
          主题配置
        </div>
        <div
          class="item-child item-child2"
          @click="operator(2)"
        >
          <el-icon
            size="30"
            color="#3698fd"
            style="margin-bottom: 8px"
          >
            <Link />
          </el-icon>
          源码拷贝
        </div>
      </div>
    </div> -->
    <el-drawer
      v-model="drawer"
      title="主题配置"
      size="300px"
    >
      <div class="theme-item">
        <label>导航栏布局</label>
        <el-select
          v-model="layout"
          placeholder="请选择"
          style="width: 150px"
          @change="(val:boolean) => changeSwitch('mode',val)"
        >
          <el-option
            label="纵向"
            value="vertical"
          />
          <el-option
            label="分栏"
            value="columns"
          />
        </el-select>
      </div>
      <div class="theme-item">
        <label>主题颜色</label>
        <el-color-picker
          v-model="primary"
          :predefine="predefineColor"
          @change="changePrimary"
        />
      </div>
      <div class="theme-item">
        <label>暗黑模式</label>
        <switch-dark />
      </div>
      <div class="theme-item">
        <label>灰色模式</label>
        <el-switch
          v-model="gray"
          @change="(val:string) => changeGrayWeak('gray',val)"
        />
      </div>
      <div class="theme-item">
        <label>色弱模式</label>
        <el-switch
          v-model="weak"
          @change="(val:string) => changeGrayWeak('weak',val)"
        />
      </div>
      <div class="theme-item">
        <label>标签栏</label>
        <el-switch
          v-model="showTag"
          @change="(val:boolean) => changeSwitch('showTag',val)"
        />
      </div>
      <div class="theme-item">
        <label>侧边栏 Logo</label>
        <el-switch
          v-model="showLogo"
          @change="(val:boolean) => changeSwitch('showLogo',val)"
        />
      </div>
      <div class="theme-item">
        <label>保持一个子菜单的展开</label>
        <el-switch
          v-model="uniqueOpened"
          @change="(val:boolean) => changeSwitch('uniqueOpened',val)"
        />
      </div>
      <div class="theme-item">
        <label>固定header</label>
        <el-switch
          v-model="fixedHeader"
          @change="(val:boolean) => changeSwitch('fixedHeader',val)"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { openLoading, closeLoading } from '~utils/element'
import SwitchDark from '~comp/switchDark/index.vue'
import { userSettingStore } from '~store/settings'

const SettingStore = userSettingStore()
const layout = ref(SettingStore.themeConfig.mode)
const showTag = ref(SettingStore.themeConfig.showTag)
const showLogo = ref(SettingStore.themeConfig.showLogo)
const uniqueOpened = ref(SettingStore.themeConfig.uniqueOpened)
const primary = ref(SettingStore.themeConfig.primary)
const fixedHeader = ref(SettingStore.themeConfig.fixedHeader)
const gray = ref(SettingStore.themeConfig.gray)
const weak = ref(SettingStore.themeConfig.weak)

const drawer = computed({
  get () {
    return SettingStore.themeConfig.showSetting
  },
  set () {
    changeSwitch('showSetting', !SettingStore.themeConfig.showSetting)
  }
})

// 预定义主题颜色
const predefineColor = [
  '#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d'
]

// !右侧定位修改主题，需要解注释
// const operator = (type) => {
//   switch (type) {
//     case 1:
//       drawer.value = true
//       return
//     case 2:
//       window.open('https://github.com/zouzhibin/vue-admin-perfect')
//   }
// }

// 进行配置
const changeSwitch = (key:string, val:boolean|string) => {
  SettingStore.setThemeConfig({ key: val })
  if (key === 'mode') {
    openLoading()
    setTimeout(() => {
      closeLoading()
    }, 600)
  }
}

// 监听布局变化
watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement
    body.setAttribute('class', `layout-${layout.value}`)
  },
  { immediate: true }
)

// 修改主题颜色
const changePrimary = (val:string) => {
  if (!val) {
    primary.value = val = SettingStore.themeConfig.primary
    ElMessage({ type: 'success', message: `主题颜色已重置为 ${SettingStore.themeConfig.primary}` })
  }
  document.documentElement.style.setProperty('--el-color-primary', val)
  changeSwitch('primary', val)
}

// 修改灰色模式
const changeGrayWeak = (type:string, val:string) => {
  const body = document.documentElement as HTMLElement
  if (!val) return body.setAttribute('style', '')
  if (type === 'gray') body.setAttribute('style', 'filter: grayscale(1)')
  if (type === 'weak') body.setAttribute('style', 'filter: invert(80%)')
  changeSwitch(type, val)
}

</script>

  <style lang="scss" scoped>
  ::v-deep(.el-drawer__header){
    padding: 15px 20px 14px;
    margin-bottom: 0;
    border-bottom: 1px solid #ebeef5;
  }

    .m-setting-fix {
      position: fixed;
      top: 50%;
      right: 0;
      z-index: 999;
      padding: 10px 0 0;
      margin: 0;
      text-align: center;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      border-top-left-radius: 5.5px;
      border-bottom-left-radius: 5.5px;
      box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
      transform: translateY(-50%);

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 8px 10px 10px;
        margin: 0;
        list-style: none;
      }

      .item-child {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        font-size: 12px;
        color: #3698fd;

        /* padding-top: 10px; */
        text-align: center;
        background: #ebf5ff;
        border-radius: 5.5px;
        transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease,
          box-shadow 0.15s ease;
      }

      .item-child2 {
        margin-top: 10px;
        color: #b37feb;
        background: #f7f2fd;
        transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease,
          box-shadow 0.15s ease;
      }
    }

    ::v-deep(.el-drawer__title) {
      font-weight: bold;
      color: black;
    }

    .theme-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 15px;
      font-size: 14px;
      color: black;

    }
  </style>
