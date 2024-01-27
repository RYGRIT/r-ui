import DefaultTheme from 'vitepress/theme'

import RIcon from '@r-ui/components/icon'
import '@r-ui/theme-chalk/src/index.scss'

console.log(RIcon)

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(RIcon)
  }
}
