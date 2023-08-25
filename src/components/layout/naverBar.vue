<template>
  <div class="container-navBar">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      class="mx-1"
      closable
      :type="tag.type"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
//
import { ref } from 'vue'

const tags = ref([
  { name: 'Tag 1', type: '' },
  { name: 'Tag 2', type: 'success' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 4', type: 'warning' },
  { name: 'Tag 5', type: 'danger' }
])
</script>

<style scoped lang="scss">
.container-navBar {
  width: 100%;
  height: 32px;
  line-height: 32px;
  border-bottom: 1px solid;
}
</style>
