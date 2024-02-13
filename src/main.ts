import 'modern-normalize/modern-normalize.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

async function prepare() {
  // @ts-ignore
  const { worker } = await import('./mock/worker')
  return worker.start()
}

prepare().then(() => {
  createApp(App).mount('#app')
})
