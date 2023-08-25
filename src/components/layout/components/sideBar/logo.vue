<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFadeCl">
      <router-link
        v-if="isCollapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          :src="logo"
          class="sidebar-logo"
        >
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          :src="logo"
          class="sidebar-logo"
        >
        <h1 class="sidebar-title">
          Vue Element Admin
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import logo from '~assets/images/logo.webp'

defineProps<{ isCollapse: boolean }>()
</script>

  <style lang="scss" scoped>
    .sidebarLogoFadeCl-enter-active {
      transition: opacity 2s;
    }

    .sidebarLogoFadeCl-enter-from,
    .sidebarLogoFadeCl-leave-to {
      opacity: 0;
    }

    .sidebar-logo-container {
      position: relative;
      width: 100%;
      height: 50px;
      overflow: hidden;
      line-height: 50px;
      text-align: center;
      background: #2b2f3a;

      & .sidebar-logo-link {
        width: 100%;
        height: 100%;

        & .sidebar-logo {
          width: 32px;
          height: 32px;
          vertical-align: middle;

        }

        & .sidebar-title {
          display: inline-block;
          margin: 0;
          margin-left: 12px;
          font-size: 14px;
          font-weight: 600;
          line-height: 50px;
          color: #fff;
          vertical-align: middle;
        }
      }
    }
  </style>
