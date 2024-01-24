<script setup lang="ts">
import { computed } from 'vue';
import { createNameSpace } from '@r-ui/utils/create';
import { iconProps } from './icon';

defineOptions({
  name: 'RIcon'
})

const bem = createNameSpace('icon')
const props = defineProps(iconProps)

// 通过计算属性来计算样式
const style = computed(() => {
  if (!props.size && !props.color) {
    return {}
  }

  return {
    ...(props.size ? { 'font-size': `${props.size}px` } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})
</script>

<template>
  <i :class="bem.b()" :style="style">
    <slot />
  </i>
</template>