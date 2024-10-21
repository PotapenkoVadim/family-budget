import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import 'primeicons/primeicons.css';
import '@/assets/main.css';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .mount('#app');
