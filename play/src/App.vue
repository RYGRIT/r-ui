<script setup lang="ts">
import { ref } from 'vue'
import { AddCircle } from '@vicons/ionicons5'
import { TreeOption } from '@r-ui/components/tree'

const data = ref(createData())

// function createData(level = 4, parentKey = ''): TreeOption[] {
//   if (!level) return []
//   const arr = new Array(6 - level).fill(0)
//   return arr.map((_, idx) => {
//     const id = parentKey + level + idx
//     return {
//       label: createLabel(level),
//       id,
//       children: createData(level - 1, id)
//     }
//   })
// }

// function createLabel(level: number): string {
//   if (level === 4) return '道生一'
//   if (level === 3) return '一生二'
//   if (level === 2) return '二生三'
//   if (level === 1) return '三生万物'
//   return ''
// }

// 异步加载数据
function createData() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}

function nextLabel(currentLabel?: string | number) {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') return 'Out of Three, the created universe'
  if (currentLabel === 'Out of Three, the created universe') return 'Out of Tao, One is born'
  return ''
}

function handleLoad(node: TreeOption) {
  return new Promise<TreeOption[]>(resolve => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}
</script>

<template>
  <r-icon :color="'red'" size="20">
    <AddCircle />
  </r-icon>
  <r-icon :color="'#0f0'" size="20">
    <AddCircle />
  </r-icon>

  <!-- <r-tree :data="data" label-field="label" key-field="id" children="children"></r-tree> -->
  <r-tree :data="data" :on-load="handleLoad" />
</template>

<style scoped></style>
