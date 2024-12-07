import moment from 'moment';
import {
  CATEGORIES_DIC,
  CHART_COLORS,
  CHART_COLORS_HOVER,
  CLIENT_DATE_FORMAT,
  DASH_CHAR,
  GRACE_PERIOD,
  MONTHS,
  NON_SPEND_CATEGORIES,
  SERVER_DATE_FORMAT,
  UNION_TOTAL_CATEGORIES_MAP
} from './constants';

export const getFirstAndLastDayOfPeriod = (offset, period) => {
  const currentDate = moment().add(offset, period);
  const start = toServerDate(currentDate.startOf(period));
  const end = toServerDate(currentDate.endOf(period));

  return [start, end];
};

export const getMonthName = (offset) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const monthIndex = (currentMonth + offset + 12) % 12;

  return MONTHS[monthIndex];
};

export const getYearText = (offset) => {
  return moment().add(offset, 'year').year();
};

export const isCurrentMonth = (date) => date && moment(date).month() === moment().month();

export const prepareDateStructure = (dateStr) => {
  const [year, month] = dateStr.split('-');
  const startDate = new Date(year, parseInt(month) - 1, 1);
  const endDate = new Date(year, parseInt(month), 0);
  const dates = {};

  let currentDate = new Date(startDate.getTime());
  while (currentDate <= endDate) {
    const date = toServerDate(currentDate);
    dates[date] = {};
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const groupBudgetByCategory = (budgetData) => {
  if (!budgetData || !budgetData.length) {
    return {};
  }

  const budgetByDates = prepareDateStructure(budgetData[0].date);
  for (let item of budgetData) {
    if (!budgetByDates[item.date][item.category]) {
      budgetByDates[item.date][item.category] = [item];
    } else {
      budgetByDates[item.date][item.category].push(item);
    }
  }

  return budgetByDates;
};

export const toServerDate = (date) => moment(date).format(SERVER_DATE_FORMAT);
export const toClientDate = (date) => moment(date).format(CLIENT_DATE_FORMAT);

export const calculateDailyResultByDay = (data) => {
  return Object.values(data).reduce((acc, [{ category, sum }]) => {
    if (category !== 'income' && category !== 'deposit') {
      acc += sum;
    }

    return acc;
  }, 0);
};

export const calculateDailyResultByCategory = (data) => {
  let res = {};
  const value = Object.values(data);

  if (value.length) {
    value.forEach((item) => {
      for (let key in item) {
        if (!res[key]) res[key] = 0;
        res[key] += item[key].reduce((acc, i) => (acc += i.sum), 0);
      }
    });
  }

  return res;
};

export const getAnnualTotal = (data) => {
  const res = Array.from({ length: 12 }, () => ({}));

  for (let { sum, category, date } of data) {
    const monthIndex = new Date(date).getMonth();
    res[monthIndex][category] = (res[monthIndex][category] || 0) + sum;
  }

  return res;
};

export const getAnnualTotalByCategory = (data, category) => {
  const categoryCalculations = {
    income: () => data.income,
    costs: () =>
      (data.costs || 0) + (data.communal || 0) + (data.internet || 0) + (data.apartments || 0),
    meal: () => (data.meal || 0) + (data.meat || 0),
    entertainment: () => data.restaurant,
    household: () => (data.household || 0) + (data.pets || 0),
    health: () => data.health,
    other: () => (data.other || 0) + (data.clothes || 0),
    deposit: () => data.deposit
  };

  return categoryCalculations[category] ? categoryCalculations[category]() : 0;
};

export const calculateAnnualResultByMonth = (data) => {
  if (!data) return DASH_CHAR;

  return Object.entries(data)
    .filter(([category]) => !NON_SPEND_CATEGORIES.includes(category))
    .reduce((acc, [, sum]) => (acc += sum), 0);
};

export const calculateAnnualResultByCategories = (data) => {
  return data.reduce((acc, item) => {
    for (let key in item) {
      const category = UNION_TOTAL_CATEGORIES_MAP[key];
      acc[category] = toRoundNumber((acc[category] || 0) + item[key]);
    }

    return acc;
  }, {});
};

export const getChartData = (budget) => {
  if (!budget || !budget.length) return {};

  const values = budget.reduce((acc, { category, sum }) => {
    if (!NON_SPEND_CATEGORIES.includes(category)) {
      acc[CATEGORIES_DIC[category]] = (acc[CATEGORIES_DIC[category]] || 0) + sum;
    }

    return acc;
  }, {});

  return {
    labels: Object.keys(values),
    datasets: [
      {
        data: Object.values(values),
        backgroundColor: CHART_COLORS,
        hoverBackgroundColor: CHART_COLORS_HOVER,
        borderColor: 'transparent'
      }
    ]
  };
};

export const getMostSpend = (budget) => {
  if (!budget || !budget.length) return DASH_CHAR;

  const { date, category, sum } = budget
    .filter((item) => !NON_SPEND_CATEGORIES.includes(item.category))
    .sort((a, b) => b.sum - a.sum)[0];

  return `${toClientDate(date)} ${CATEGORIES_DIC[category]} - ${toRoundNumber(sum)}₽`;
};

export const getMostSpendCategory = (budget) => {
  if (!budget || !budget.length) return DASH_CHAR;

  const value = budget
    .filter((item) => !NON_SPEND_CATEGORIES.includes(item.category))
    .reduce((acc, { category, sum }) => {
      acc[category] = (acc[category] || 0) + sum;

      return acc;
    }, {});

  const maxEntry = Object.entries(value).reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  });

  return `${CATEGORIES_DIC[maxEntry[0]]} - ${toRoundNumber(maxEntry[1])}₽`;
};

export const getMaxSpend = (budget) => {
  if (!budget || !budget.length) return DASH_CHAR;

  const value = budget.reduce((acc, { sum }) => (acc += sum), 0);

  return `${toRoundNumber(value)}₽`;
};

export const getInCome = (budget) => {
  if (!budget || !budget.length) return DASH_CHAR;

  const value = budget.reduce((acc, { category, sum }) => {
    if (category === 'income') acc += sum;

    return acc;
  }, 0);

  return `${toRoundNumber(value)}₽`;
};

export const transformToAnnualBudget = (budget) => {
  const categoryMap = {
    meat: 'meal',
    pets: 'household'
  };

  return budget?.map((item) => ({
    ...item,
    category: categoryMap[item.category] || item.category
  }));
};

export const addGracePeriod = (date) => {
  return moment(date).add(GRACE_PERIOD, 'month').endOf('month').format(CLIENT_DATE_FORMAT);
};

export const toRoundNumber = (num) => Math.round(num * 100) / 100;
