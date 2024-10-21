export const ROUTER_PATHS = {
  home: '/',
  budget: '/budget',
  total: '/total'
};

export const SIDEBAR_MENU_ITEMS = [
  { key: 'home', label: 'Главная', icon: 'pi pi-home', route: ROUTER_PATHS.home },
  { key: 'budget', label: 'Повседневные', icon: 'pi pi-calendar', route: ROUTER_PATHS.budget },
  { key: 'total', label: 'Итого', icon: 'pi pi-briefcase', route: ROUTER_PATHS.total }
];
