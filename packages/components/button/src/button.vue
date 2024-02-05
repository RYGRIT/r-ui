<script lang="ts" setup>
import { createNameSpace } from '@r-ui/utils/create'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'RButton'
})

const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)

const ns = createNameSpace('button')
</script>

<template>
  <button
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('loading', loading),
      ns.is('round', round),
      ns.is('disabled', disabled)
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
  >
    <slot />
  </button>
</template>
