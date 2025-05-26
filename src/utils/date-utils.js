import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const humanizePointDueDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';

const countDuration = (dateStart, dateEnd) => {
  dayjs.extend(duration);
  const diff = dayjs.duration(dayjs(dateEnd).diff(dateStart));

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  if (diff.asHours() < 1) {
    return `${padZero(diff.minutes())}m`;
  } else if (diff.asDays() < 1) {
    return `${padZero(diff.hours())}h ${padZero(diff.minutes())}m`;
  } else {
    const totalDays = diff.years ? diff.years() * 365 + diff.days() : diff.days;
    return `${padZero(totalDays)}d ${padZero(diff.hours())}h ${padZero(diff.minutes())}m`;
  }
};


export {humanizePointDueDate, countDuration};
