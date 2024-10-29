import { ROUTER_PATHS } from '@/constants';
import { useSession } from '@/store/session';
import { computed, ref } from 'vue';

export const useNavigationMenu = () => {
  const sessionStorage = useSession();
  const isLoggedIn = computed(() => Boolean(sessionStorage.currentSession));

  const menuItems = ref([
    {
      key: 'home',
      label: 'Главная',
      icon: 'pi pi-home',
      route: ROUTER_PATHS.home,
      show: true
    },
    {
      key: 'budget',
      label: 'Повседневные',
      icon: 'pi pi-calendar',
      route: ROUTER_PATHS.budget,
      show: isLoggedIn.value
    },
    {
      key: 'total',
      label: 'Итого',
      icon: 'pi pi-briefcase',
      route: ROUTER_PATHS.total,
      show: isLoggedIn.value
    },
    {
      key: 'login',
      label: 'Войти',
      icon: 'pi pi-user',
      route: ROUTER_PATHS.login,
      show: !isLoggedIn.value
    }
  ]);

  return { menuItems };
};
