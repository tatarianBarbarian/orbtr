import 'modern-normalize/modern-normalize.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

async function prepare() {
  // @ts-ignore
  const { worker } = await import('./mock/worker')
  return worker.start({
    serviceWorker: {
      // This is useful if your application follows
      // a strict directory structure.
      url: import.meta.env.DEV ? '/mockServiceWorker.js' : '/orbtr/mockServiceWorker.js'
    }
  })
}

prepare().then(() => {
  createApp(App).mount('#app')
})
