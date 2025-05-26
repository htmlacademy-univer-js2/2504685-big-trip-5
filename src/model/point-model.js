import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = [];
  #pointsApiService;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init(){
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClientPoints);
    } catch(err) {
      this.#points = [];
    }
  }

  get points() {
    return this.#points;
  }

  async updatePoint (updateType, newPoint) {

    const index = this.#points.findIndex((point) => point.id === newPoint.id);

    if (index === -1) {
      throw new Error('can\'t find point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(newPoint);
      const updatedPoint = this.#adaptToClientPoints(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');

    }
  }

  async addPoint(updateType, newPoint){
    try {

      const response = await this.#pointsApiService.addPoint(newPoint);
      const adaptedResponse = this.#adaptToClientPoints(response);
      this.#points = [adaptedResponse, ...this.#points];

      this._notify(updateType, adaptedResponse);
    } catch(err) {
      throw new Error(err);
    }
  }

  async deletePoint(updateType, newPoint){

    const index = this.#points.findIndex((task) => task.id === newPoint.id);

    if (index === -1) {
      throw new Error('can\'t find point');
    }

    try {

      await this.#pointsApiService.deletePoint(newPoint);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClientPoints(point) {
    const adapted = {...point,
      date: { start: new Date(point['date_from']), end: new Date(point['date_to'])},
      cost: point['base_price'],
      isFavorite: point['is_favorite'],
    };
    delete adapted['base_price'];
    delete adapted['date_from'];
    delete adapted['date_to'];
    delete adapted['is_favorite'];

    return adapted;
  }
}
