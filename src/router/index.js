import { createMemoryHistory, createRouter } from 'vue-router';
import { ROUTER_PATHS } from '@/constants';
import { supabase } from '@/clients/supabase';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: ROUTER_PATHS.path,
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: ROUTER_PATHS.budget,
      component: () => import('@/views/BudgetPage.vue'),
      meta: { shouldAuth: true }
    },
    {
      path: ROUTER_PATHS.total,
      component: () => import('@/views/TotalPage.vue'),
      meta: { shouldAuth: true }
    },
    {
      path: ROUTER_PATHS.login,
      component: () => import('@/views/LoginPage.vue'),
      mete: { shouldNotAuthorized: true }
    }
  ]
});

async function getUser(next) {
  const { data, error } = await supabase.auth.getSession();

  switch (true) {
    case Boolean(error):
      next(ROUTER_PATHS.error);
      break;

    case data.session === null:
      next(ROUTER_PATHS.login);
      break;

    default:
      next();
  }
}

router.beforeEach((to, _, next) => {
  switch (true) {
    case to.meta.shouldAuth:
      getUser(next);
      break;

    case to.meta.shouldNotAuthorized:
      next(ROUTER_PATHS.home);
      break;

    default:
      next();
  }
});

export default router;
