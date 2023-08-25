<template>
  <div class="m-headerSearch">
    <el-tooltip
      effect="dark"
      content="菜单搜索"
      placement="bottom"
    >
      <el-icon
        class="bell header-icon"
        style="font-size: 22px"
        @click="handleSearch"
      >
        <Search />
      </el-icon>
    </el-tooltip>
    <el-dialog
      v-model="isShowSearch"
      width="600px"
      destroy-on-close
      :show-close="false"
    >
      <el-select
        style="width: 100%"
        ref="headerSearchSelect"
        v-model="search"
        :remote-method="querySearch"
        filterable
        default-first-option
        remote
        placeholder="菜单搜索 ：支持菜单名称、路径"
        class="header-search-select"
        @change="change"
      >
        <el-option
          v-for="item in options"
          :key="item.item.path"
          :value="item.item.path"
          :label="item && item.item.title && item.item.title.length && item.item.title.join(' > ')"
        />
      </el-select>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'

import { generateRoutes } from '~utils/router'
import { usePermissionStore } from '~store/permission'
const router = useRouter()
const isShowSearch = ref(false)
const options = ref([])
const searchPool = ref([])
const search = ref('')
const fuse = ref(null)
const PermissionStore = usePermissionStore()
const routes = computed(() => PermissionStore.routes)

const handleSearch = () => {
  isShowSearch.value = true
}

const initFuse = (list) => {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

watch(searchPool, (list) => {
  initFuse(list)
})

const change = (val) => {
  if (val) {
    router.push({
      path: val
    })
  }
  options.value = []
  search.value = ''
  isShowSearch.value = false
}
onMounted(() => {
  searchPool.value = generateRoutes(JSON.parse(JSON.stringify(routes.value)))
})

const querySearch = (query) => {
  if (query !== '') {
    options.value = fuse.value.search(query)
  } else {
    options.value = []
  }
}
</script>

  <style lang="scss" scoped>
    .m-headerSearch {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      .item-info-pop {
        display: flex;
        align-items: center;
      }
      .bell {
        color: black;
      }
      .item-child {
        display: flex;
        align-items: center;
        font-size: 13px;
      }
    }
    .transverseMenu {
      .bell {
        color: white;
      }
    }
    .header-search-select {
    }
    /* 菜单搜索样式 */
    .m-headerSearch {
      :deep(.el-dialog) {
        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
          padding: 0;
        }
      }
      .header-search-select {
        height: 50px;
        :deep(.el-input__wrapper) {
          height: 50px;
        }
      }
    }
  </style>
