import { ExtractPropTypes, PropType } from 'vue'

export type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  children: TreeNode[]
  level: number
  rawNode: TreeOption
  isLeaf: boolean
}

export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  [key: string]: unknown // 任意接口
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  children: {
    type: String,
    default: 'children'
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  }
} as const

export type TreeNodeEmits = {
  (e: 'toggle', node: TreeNode): void
}

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
