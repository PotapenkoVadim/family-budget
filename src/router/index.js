import { createMemoryHistory, createRouter } from 'vue-router';
import { ROUTER_PATHS } from '@/constants';

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: ROUTER_PATHS.path,
      component: () => import('@/views/HomePage.vue')
    }
  ]
});
