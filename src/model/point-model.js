import {getRandomPoint} from '../mock/point.js';
import { POINTS_COUNT } from '../const.js';

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

}
