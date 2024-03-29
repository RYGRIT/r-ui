import { createApp } from 'vue'
import Icon from '@r-ui/components/icon'
import Tree from '@r-ui/components/tree'
import Button from '@r-ui/components/button'
import App from './App.vue'

import '@r-ui/theme-chalk/src/index.scss'

const plugins = [Icon, Tree, Button]

const app = createApp(App)

plugins.forEach(plugin => {
  app.use(plugin)
})
app.mount('#app')
