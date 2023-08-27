<template>
  <component
    :is="type"
    v-bind="linkProps(to)"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isExternal } from '~utils/validate'
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const canExternal = computed(() => {
  return isExternal(props.to)
})

const type = computed(() => {
  if (canExternal.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to:string) => {
  if (canExternal.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to
  }
}
</script>

  <style lang="scss" scoped>
    a {
      text-decoration: none;
    }
  </style>
