<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed } from 'vue'
export default {
  name: 'BaseSvgIcon',
  props: {
    iconClass: { type: String, required: true },
    className: { type: String, default: () => '' }
  },
  setup (props) {
    const iconName = computed(() => {
      return props.iconClass ? `#icon-${props.iconClass}` : '#icon'
    })
    const svgClass = computed(() => {
      console.log(props.iconClass)

      return props.className ? 'svg-icon ' + props.className : 'svg-icon'
    })
    return { iconName, svgClass }
  }
}
</script>

<style scoped lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentcolor;
  }
</style>
