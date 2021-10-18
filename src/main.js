import { createApp } from 'vue'
import App from './App.vue'
import { createMetaManager } from 'vue-meta'

import { Vue3Mq } from "vue3-mq";


const app = createApp(App);
app.use(createMetaManager())
app.use(Vue3Mq)

app.mount('#app');

