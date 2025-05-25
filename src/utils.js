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

const sortByTime = (point1, point2) => {
  const time1 = dayjs(point1.date.start).hour() * 60 + dayjs(point1.date.start).minute();
  const time2 = dayjs(point2.date.start).hour() * 60 + dayjs(point2.date.start).minute();

  return getWeightForNullDate(point1.date.start, point2.date.start) ?? time1 - time2;
};

const sortByEvent = (point1, point2) =>
  point1.type[0].localeCompare(point2.type[0]);

const sortByPrice = (point1, point2) =>
  point2.cost - point1.cost;

const sortByOffers = (point1, point2) =>
  point2.offers.length - point1.offers.length();

const sortByDefault = (point1, point2) => {

  const weight = getWeightForNullDate(point1.date.start, point2.date.start);

  return weight ?? dayjs(point1.date.start).diff(dayjs(point2.date.start));

};

export{sortByDefault, sortByOffers, sortByPrice, sortByEvent, sortByTime, getRandomArrayElement, humanizeTaskDueDate, countDuration, getRandomInt, updateItem};
