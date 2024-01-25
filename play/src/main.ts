import { createApp } from 'vue';
import Icon from '@r-ui/components/icon';
import App from './App.vue';

import '@r-ui/theme-chalk/src/index.scss';

const plugins = [Icon];

const app = createApp(App);

plugins.forEach(plugin => {
  app.use(plugin);
});
app.mount('#app');
