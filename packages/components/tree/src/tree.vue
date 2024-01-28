<script setup lang="ts">
import { ref, watch } from 'vue'
import { TreeNode, TreeOption, treeProps } from './tree'

defineOptions({
  name: 'RTree'
})

const props = defineProps(treeProps)

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
      let children = treeOptions.getChildren(node)
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

console.log(tree.value)
</script>

<template>Tree</template>
