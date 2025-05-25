import { dayjs } from 'dayjs';


export default class FiltersModel {
  #isEmpty = true;

  #filters = {};

  constructor (pointsCount) {
    if(pointsCount > 0){
      this.#isEmpty = false;
    }
    this.#filters = {
      'everything': (data) => [...data],
      'future': (data) => data.filter((point) => dayjs(point.date.start).isBefore(dayjs(new Date())).day),
      'present': (data) => data.filter((point) => dayjs(point.date.start.day).isSame(dayjs(new Date()).day)),
      'past': (data) => data.filter((point) => dayjs(point.date.start).isAfter(dayjs(new Date())).day)
    };
  }

  get filters(){
    return this.#filters;
  }

  get isEmpty(){
    return this.#isEmpty;
  }
}
