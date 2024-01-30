<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { createNameSpace } from '@r-ui/utils/create'

import { TreeNode, TreeOption, treeProps } from './tree'
import RTreeNode from './tree-node.vue'

defineOptions({
  name: 'RTree'
})

const props = defineProps(treeProps)

const ns = createNameSpace('tree')

// 格式化用户传入的数据
const tree = ref<TreeNode[]>([])

function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string
    },
    getLabel(node: TreeOption) {
      return node[label] as string
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[]
    }
  }
}

const treeOptions = createOptions(props.keyField, props.labelField, props.children)

const createTree = (data: TreeOption[]): TreeNode[] => {
  function traversal(data: TreeOption[], parent: TreeNode | null = null): TreeNode[] {
    return data.map(node => {
      const children = treeOptions.getChildren(node)
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        isLeaf: node.isLeaf ?? children.length === 0
      }

      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode)
      }

      return treeNode
    })
  }

  const res = traversal(data)
  return res
}

watch(
  () => props.data,
  newVal => {
    tree.value = createTree(newVal)
  },
  { immediate: true }
)

// 将一棵树拍平
// 默认展开第一层
// 需要默认展开的 key
const defaultExpandedKeys = ref(new Set(props.defaultExpandedKeys))

const flattenTree = computed(() => {
  const expandedKeys = defaultExpandedKeys.value
  // 最终拍平的节点
  const flattenNodes: TreeNode[] = []

  // 被格式化后的节点
  const nodes = tree.value || []

  // 用于深度优先遍历的栈
  const stack: TreeNode[] = []

  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }

  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    if (expandedKeys.has(node.key)) {
      const children = node.children
      if (children.length) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i])
        }
      }
    }
  }

  return flattenNodes
})

function isExpanded(node: TreeNode): boolean {
  return defaultExpandedKeys.value.has(node.key)
}

function collapse(node: TreeNode) {
  const expandedKeys = defaultExpandedKeys.value
  expandedKeys.delete(node.key)
}

function expand(node: TreeNode) {
  const expandedKeys = defaultExpandedKeys.value
  expandedKeys.add(node.key)
}

// 切换展开折叠
function toggleExpand(node: TreeNode) {
  const expandedKeys = defaultExpandedKeys.value
  if (expandedKeys.has(node.key)) {
    collapse(node)
  } else {
    expand(node)
  }
}
</script>

<template>
  <div :class="ns.b()">
    <r-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      @toggle="toggleExpand(node)"
    />
  </div>
</template>
