import {getRandomPoint} from '../mock/point.js';
import { POINTS_COUNT } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

  updatePoint (updateType, newPoint) {

    const index = this.#points.findIndex((point) => point.id === newPoint.id);

    if (index === -1) {
      throw new Error('can\'t find point' );
    }

    this.#points = [
      ...this.#points.slice(0, index),
      newPoint,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, newPoint);
  }

  addPoint(updateType, newPoint){
    this.#points = [
      newPoint,
      ...this.#points,
    ];
    this._notify(updateType, newPoint);
  }

  deletePoint(updateType, newPoint){

    const index = this.#points.findIndex((task) => task.id === newPoint.id);

    if (index === -1) {
      throw new Error('can\'t find point' );
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
