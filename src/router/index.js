import { createWebHistory, createRouter } from 'vue-router';
import { ROUTER_PATHS } from '@/constants';
import { supabase } from '@/clients/supabase';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTER_PATHS.home,
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: ROUTER_PATHS.daily,
      component: () => import('@/views/DailyPage.vue'),
      meta: { shouldAuth: true }
    },
    {
      path: ROUTER_PATHS.annual,
      component: () => import('@/views/AnnualPage.vue'),
      meta: { shouldAuth: true }
    },
    {
      path: ROUTER_PATHS.card,
      component: () => import('@/views/CreditCardPage.vue'),
      meta: { shouldAuth: true }
    },
    {
      path: ROUTER_PATHS.login,
      component: () => import('@/views/LoginPage.vue'),
      meta: { shouldNotAuthorized: true }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/ErrorPage.vue')
    }
  ]
});

async function checkAuthStrategy(to, _, next) {
  const { data, error } = await supabase.auth.getSession();

  switch (true) {
    case Boolean(error):
      return next(ROUTER_PATHS.error);

    case data.session === null && to.meta.shouldAuth:
      return next(ROUTER_PATHS.login);

    case data.session !== null && to.meta.shouldNotAuthorized:
      return next(ROUTER_PATHS.home);

    default:
      return next();
  }
}

router.beforeEach(checkAuthStrategy);

export default router;
