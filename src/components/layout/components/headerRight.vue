<template>
  <div class="header-tool-right">
    <GlobalComSize class="item-children" />
    <HeaderSearch class="item-children" />
    <Remind class="item-children" />
    <ScreenFull class="item-children" />
    <Setting class="item-children" />
    <Avatar />
  </div>
</template>

<script lang="ts" setup>
// 全局 dropdown 组件
import GlobalComSize from './globalComSize.vue'
import HeaderSearch from './headerSearch.vue'
import Remind from './remind.vue'
import ScreenFull from './screenFull.vue'
import Setting from './settings.vue'
import Avatar from './avatar.vue'
</script>

  <style lang="scss" scoped>
  .header-tool-right{
    display: flex;
    align-items: center;

    .item-children{
      margin-right: 22px;
    }
  }
  </style>
