import SortView from '../view/sort-view.js';
import FiltersView from '../view/filters-view.js';
import TripsContainer from '../view/tripsContainer-view.js';
import {render} from '../framework/render.js';
import EmptyPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';

export default class Presenter {
  #pointsContainer = new TripsContainer();
  #headerElement;
  #pointsElement;
  #pointsModel;
  #filterModel;

  #pointPresenters = new Map();

  #points = [];
  constructor({headerElement, tripsElement, pointsModel, filterModel}) {
    this.#headerElement = headerElement;
    this.#pointsElement = tripsElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#renderComponents();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      {
        pointsContainer: this.#pointsElement,
        onPointChange: this.#onPointChange,
        onModeChange: this.#onModeChange
      }
    );
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEmptyPoints(){
    render(new EmptyPointsView(), this.#pointsElement);
  }

  #renderSort(){
    render(new FiltersView(this.#filterModel), this.#headerElement);
  }

  #renderFilters(){
    render(new SortView(), this.#pointsElement);
  }

  #renderPointsContainer(){
    render(this.#pointsContainer, this.#pointsElement);
  }

  #initPoints(){
    this.#renderPointsContainer();

    if(this.#points.length === 0){
      this.#renderEmptyPoints();
    }
    else{
      this.#renderPoints();
    }
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderComponents() {
    this.#renderSort();
    this.#renderFilters();
    this.#initPoints();
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }


  #onPointChange = (newPoint) => {
    this.#points = updateItem(this.#points, newPoint);
    this.#pointPresenters.get(newPoint.id).init(newPoint);
  };
}