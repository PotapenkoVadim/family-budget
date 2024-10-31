import moment from 'moment';
import { MONTHS, SERVER_DATE_FORMAT } from './constants';

export const getFirstAndLastDayOfMonth = (offset) => {
  const currentDate = moment().add(offset, 'month');
  const start = currentDate.startOf('month').format(SERVER_DATE_FORMAT);

  const end = currentDate.endOf('month').format(SERVER_DATE_FORMAT);

  return [start, end];
};

export const getMonthName = (offset) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const monthIndex = (currentMonth + offset + 12) % 12;

  return MONTHS[monthIndex];
};
