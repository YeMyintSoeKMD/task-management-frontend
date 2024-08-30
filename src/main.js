import './assets/axios-config.js'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Service worker registration
if("serviceWorker" in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('sw registered'))
        .catch(err => console.log(err))
    })
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
