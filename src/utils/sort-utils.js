import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
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
};


const sortByTime = (point1, point2) => (
  (new Date(point2.date.end) - new Date(point2.date.start)) -
  (new Date(point1.date.end) - new Date(point1.date.start))
);

const sortByPrice = (point1, point2) => point2.cost - point1.cost;

const sortByDefault = (point1, point2) => {

  const weight = getWeightForNullDate(point1.date.start, point2.date.start);

  return weight ?? dayjs(point1.date.start).diff(dayjs(point2.date.start));

};


export {sortByDefault, sortByPrice, sortByTime};
