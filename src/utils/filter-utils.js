import dayjs from 'dayjs';

const FiltersMethods = {
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


export { FiltersMethods };
