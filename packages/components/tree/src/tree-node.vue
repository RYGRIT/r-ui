<script setup lang="ts">
import { computed } from 'vue'
import { createNameSpace } from '@r-ui/utils/create'

import SwitcherIcon from './icon/switcher'
import Loading from './icon/Loading'
import { type TreeNodeEmits, treeNodeProps } from './tree'

defineOptions({
  name: 'RTreeNode'
})

const { node, expanded, loadingKeys } = defineProps(treeNodeProps)
const emit = defineEmits<TreeNodeEmits>()

const ns = createNameSpace('tree-node')

const isLoading = computed(() => {
  return loadingKeys.has(node.key)
})

function handleExpand() {
  emit('toggle', node)
}
</script>

<template>
  <div :class="ns.b()">
    <div
      :class="ns.e('content')"
      :style="{ paddingLeft: `${node.level * 16}px` }"
      @click="handleExpand"
    >
      <r-icon
        :class="[
          ns.e('expand-icon'),
          { expanded: expanded && !node.isLeaf },
          ns.is('leaf', node.isLeaf)
        ]"
      >
        <switcher-icon />
      </r-icon>
      <span :class="ns.e('label')">{{ node?.label }}</span>
      <r-icon v-if="isLoading" :class="ns.e('loading-icon')">
        <loading />
      </r-icon>
    </div>
  </div>
</template>
