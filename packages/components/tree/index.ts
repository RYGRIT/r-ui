import _Tree from './src/tree.vue'

import { withInstall } from '@r-ui/utils/with-install'

const Tree = withInstall(_Tree)

export default Tree
export * from './src/tree'

declare module 'vue' {
  export interface GlobalComponents {
    RTree: typeof Tree
  }
}
