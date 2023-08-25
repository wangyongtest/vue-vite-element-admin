<template>
  <div class="header-tool-left">
    <CollapseIcon />
    <Hamburger />
  </div>
</template>

<script lang="ts" setup>
import CollapseIcon from './collapseIcon.vue'
import Hamburger from './hamburger.vue'
</script>

  <style lang="scss" scoped>
  .header-tool-left{
    display: flex;
    align-items: center;
    height: 100%;
  }
  </style>
