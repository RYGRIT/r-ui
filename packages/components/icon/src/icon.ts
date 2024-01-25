// 定义组件相关属性和 ts 类型
import { ExtractPropTypes, PropType } from 'vue'

// as const 标识为只读
export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
