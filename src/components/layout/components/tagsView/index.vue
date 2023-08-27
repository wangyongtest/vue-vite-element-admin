<template>
  <div class="header-tags-view">
    <div class="tags-view">
      <el-tabs
        v-model="activeTabsValue"
        type="card"
        @tab-click="tabClick"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in visitedViews"
          :key="item.path"
          :path="item.path"
          :label="item.title"
          :name="item.path"
          :closable="!(item.meta&&item.meta.affix)"
        >
          <template #label>
            <el-icon
              class="tabs-icon"
              v-if="item.icon"
            >
              <component :is="item.icon" />
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right-btn">
      <MoreButton />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, watch, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TabsPaneContext } from 'element-plus'
import MoreButton from './moreBtns.vue'
import { filterAffixTags } from '~utils/router'
import { useTagsViewStore } from '~store/tagsView'
import { usePermissionStore } from '~store/permission'

const route:any = useRoute()
const router = useRouter()
const TagsViewStore = useTagsViewStore()
const PermissionStore = usePermissionStore()
const visitedViews:any = computed(() => TagsViewStore.visitedViews)
const routes = computed(() => PermissionStore.routes)

const addTags = () => {
  const { name } = route
  if (name === 'Login') {
    return
  }
  if (name) {
    TagsViewStore.addView(route)
  }
  return false
}
const affixTags = ref([])

const initTags = () => {
  const routesNew = routes.value
  const affixTag = (affixTags.value = filterAffixTags(routesNew))
  for (const tag of affixTag) {
    if (tag.name) {
      TagsViewStore.addVisitedView(tag)
    }
  }
}
onMounted(() => {
  initTags()
  addTags()
})
watch(route, () => {
  addTags()
})

const activeTabsValue = computed({
  get: () => {
    return TagsViewStore.activeTabsValue
  },
  set: val => {
    TagsViewStore.setTabsMenuValue(val)
  }
})
function toLastView (activeTabPath:string) {
  const index = visitedViews.value.findIndex((item:any) => item.path === activeTabPath)
  const nextTab:any = visitedViews.value[index + 1] || visitedViews.value[index - 1]
  if (!nextTab) return
  router.push(nextTab.path)
  TagsViewStore.addVisitedView(nextTab)
}
const tabClick = (tabItem: TabsPaneContext) => {
  const path = tabItem.props.name as string
  router.push(path)
}

const isActive = (path:string) => {
  return path === route.path
}
const removeTab = async (activeTabPath: string) => {
  if (isActive(activeTabPath)) {
    toLastView(activeTabPath)
  }
  await TagsViewStore.delView(activeTabPath)
}
</script>
  <style lang="scss" scoped>
  @import '~styles/variables.scss';
  .header-tags-view{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 10px;
    background: white;

    .right-btn{
      flex-shrink: 0;
      height: 100%;
    }
  }

  .tags-view {
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;

    .el-tabs--card :deep(.el-tabs__header) {
      box-sizing: border-box;
      height: 40px;
      padding: 0 10px;
      margin: 0;
    }

    ::v-deep(.el-tabs) {
      .el-tabs__nav {
        border: none;
      }

      .el-tabs__header .el-tabs__item {
        color: #ccc;
        border: none;
      }

      .el-tabs__header .el-tabs__item.is-active {
        color: $primaryColor;
        border-bottom:2px solid $primaryColor;
      }
    }
  }
  </style>
