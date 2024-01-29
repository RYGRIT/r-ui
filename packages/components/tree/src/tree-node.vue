<script setup lang="ts">
import { createNameSpace } from '@r-ui/utils/create'

import SwitcherIcon from './icon/switcher'
import { treeNodeProps } from './tree'

defineOptions({
  name: 'RTreeNode'
})

const { node, expanded } = defineProps(treeNodeProps)

const ns = createNameSpace('tree-node')
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('content')" :style="{ paddingLeft: `${node.level * 16}px` }">
      <r-icon
        :class="[ns.e('expand-icon'), { expanded: expanded && !node.isLeaf }]"
        color="pink"
        size="20px"
      >
        <switcher-icon />
      </r-icon>
      <span :class="ns.e('label')">{{ node?.label }}</span>
    </div>
  </div>
</template>
