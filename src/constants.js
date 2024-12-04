export const ROUTER_PATHS = {
  home: '/family-budget/',
  daily: '/family-budget/daily',
  annual: '/family-budget/annual',
  login: '/family-budget/login',
  card: '/family-budget/card'
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
export const ANNUAL_BUDGET_COLS = 'id,sum,category,date,is_credit';
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

export const CHART_COLORS = [
  '#0A2342',
  '#2CA58D',
  '#FFFDF7',
  '#91171F',
  '#FAFF7F',
  '#2D5D7B',
  '#81ADC8',
  '#FF5154',
  '#5941A9',
  '#32292F',
  '#17C3B2',
  '#6D72C3',
  '#514F59'
];

export const CHART_COLORS_HOVER = [
  '#091231',
  '#1B946C',
  '#EEECE6',
  '#80060E',
  '#E9EE8E',
  '#1C4C6A',
  '#709CB&',
  '#EE4043',
  '#483098',
  '#21181E',
  '#06B2A1',
  '#5C61B2',
  '#403E48'
];

export const CHART_OPTIONS = {
  plugins: {
    legend: {
      labels: { usePointStyle: true, color: 'white' },
      position: 'bottom'
    }
  }
};

export const GRACE_PERIOD = 3;

export const NON_SPEND_CATEGORIES = ['income', 'deposit'];
