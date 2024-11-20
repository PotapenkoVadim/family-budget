export const ROUTER_PATHS = {
  home: '/',
  daily: '/daily',
  annual: '/annual',
  login: '/login',
  error: '/error'
};

export const SERVER_DATE_FORMAT = 'YYYY-MM-DD';
export const CLIENT_DATE_FORMAT = 'DD.MM.YYYY';
export const TOAST_DEFAULT_ERROR_MESSAGE = {
  severity: 'error',
  summary: 'Произошла ошибка! Повторите попытку позже.',
  life: 3000
};

export const DEFAULT_ACCESS_TYPE = 'demo';
export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

export const CATEGORIES_DIC = {
  meal: 'Продукты',
  meat: 'Мясо',
  restaurant: 'Рестораны',
  household: 'Хоз траты',
  pets: 'Питомцы',
  communal: 'Коммуналка',
  internet: 'Интернет',
  apartments: 'Квартира',
  health: 'Здоровье',
  other: 'Другое',
  clothes: 'Одежда',
  deposit: 'Отложено',
  income: 'Доход',
  costs: 'Об. расходы',
  entertainment: 'Развлечения'
};

export const CATEGORIES = [
  'meal',
  'meat',
  'restaurant',
  'household',
  'pets',
  'communal',
  'internet',
  'apartments',
  'health',
  'other',
  'clothes',
  'deposit',
  'income'
];

export const DASH_CHAR = '-';
export const ANNUAL_BUDGET_COLS = 'id,sum,category,date';
export const DAILY_BUDGET_COLS = `${ANNUAL_BUDGET_COLS},comment`;

export const TOTAL_CATEGORIES = [
  'income',
  'costs',
  'meal',
  'entertainment',
  'household',
  'health',
  'other',
  'deposit'
];

export const EMPTY_DAILY_BUDGET_TEXT = 'Данные за этот месяц отсутствуют';
export const EMPTY_ANNUAL_BUDGET_TEXT = 'Данные за этот год отсутствуют';
