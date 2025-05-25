import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const humanizeTaskDueDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';

const countDuration = (dateStart, dateEnd) => {

  dayjs.extend(duration);
  const diff = dayjs.duration(dayjs(dateEnd).diff(dateStart));

  if (diff.asHours() < 1) {
    return `${diff.minutes()}M`;
  } else if (diff.asDays() < 1) {
    return `${diff.hours()}H ${diff.minutes()}M`;
  } else {
    return `${diff.days()}D ${diff.hours()}H ${diff.minutes()}M`;
  }
};


const getRandomInt = (maxNumber) => Math.floor(Math.random() * maxNumber);

const getRandomArrayElement = (items) => items[getRandomInt(items.length)];

const updateItem = (items, update) => {
  const updatedItems = items.map((item) => (item.id === update.id ? update : item));
  return updatedItems;
};

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

const sortByTime = (point1, point2) => (
  (new Date(point2.date.end) - new Date(point2.date.start)) -
  (new Date(point1.date.end) - new Date(point1.date.start))
);

const sortByPrice = (point1, point2) =>
  point2.cost - point1.cost;

const sortByDefault = (point1, point2) => {

  const weight = getWeightForNullDate(point1.date.start, point2.date.start);

  return weight ?? dayjs(point2.date.start).diff(dayjs(point1.date.start));

};


const filter = {
  'everything': (points) => points,
  'future': (points) => points.filter((point) => dayjs().isBefore(dayjs(point.date.start), 'day')),
  'present': (points) => points.filter((point) => {
    const now = dayjs();
    const startDate = dayjs(point.date.start);
    const endDate = dayjs(point.date.end);
    return (now.isAfter(startDate, 'day') || now.isSame(startDate, 'day')) &&
           (now.isBefore(endDate, 'day') || now.isSame(endDate, 'day'));
  }),
  'past': (points) => points.filter((point) => dayjs().isAfter(dayjs(point.date.end), 'day')),
};

const isEscKey = (key) => key === 'Escape';


export{isEscKey, filter ,sortByDefault, sortByPrice, sortByTime, getRandomArrayElement, humanizeTaskDueDate, countDuration, getRandomInt, updateItem};
