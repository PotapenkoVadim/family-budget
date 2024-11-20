import moment from 'moment';
import { CLIENT_DATE_FORMAT, MONTHS, SERVER_DATE_FORMAT } from './constants';

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

export const calculateTotalByDay = (data) => {
  return Object.values(data).reduce((acc, item) => (acc += item[0].sum), 0);
};

export const calculateTotalByCategory = (data) => {
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

    if (res[monthIndex]) {
      res[monthIndex][category] = res[monthIndex][category] ? res[monthIndex][category] + sum : sum;
    } else {
      res[monthIndex] = { [category]: sum };
    }
  }

  return res;
};

export const getAnnualTotalByCategory = (data, category) => {
  switch (category) {
    case 'income':
      return data.income;
    case 'costs':
      return data.costs;
    case 'meal':
      return (data.meal || 0) + (data.meat || 0);
    case 'entertainment':
      return data.restaurant;
    case 'household':
      return (data.household || 0) + (data.pets || 0);
    case 'health':
      return data.health;
    case 'other':
      return data.other;
    case 'deposit':
      return data.deposit;
  }
};
