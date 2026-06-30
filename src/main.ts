import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import OktaVue from '@okta/okta-vue'
import { oktaAuth } from './Okta'

const app = createApp(App)

app.use(OktaVue, {
  oktaAuth,
  onAuthRequired: () => {
    router.push('/login')
  },
  onAuthResume: () => {
    router.push('/login')
  },
})
app.use(router)

app.mount('#app')
