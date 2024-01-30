<script setup lang="ts">
import { createNameSpace } from '@r-ui/utils/create'

import SwitcherIcon from './icon/switcher'
import { type TreeNodeEmits, treeNodeProps } from './tree'

defineOptions({
  name: 'RTreeNode'
})

const { node, expanded } = defineProps(treeNodeProps)
const emit = defineEmits<TreeNodeEmits>()

const ns = createNameSpace('tree-node')

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
    </div>
  </div>
</template>
