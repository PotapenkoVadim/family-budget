import moment from 'moment';
import { CLIENT_DATE_FORMAT, MONTHS, SERVER_DATE_FORMAT } from './constants';

export const getFirstAndLastDayOfMonth = (offset) => {
  const currentDate = moment().add(offset, 'month');
  const start = toServerDate(currentDate.startOf('month'));
  const end = toServerDate(currentDate.endOf('month'));

  return [start, end];
};

export const getMonthName = (offset) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const monthIndex = (currentMonth + offset + 12) % 12;

  return MONTHS[monthIndex];
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
    return [];
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
