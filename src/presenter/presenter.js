import SortView from '../view/sort-view.js';
import FiltersView from '../view/filters-view.js';
import TripsContainer from '../view/tripsContainer-view.js';
import {render} from '../framework/render.js';
import EmptyPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem, sortByTime, sortByEvent, sortByPrice, sortByOffers, sortByDefault } from '../utils.js';
import { SortTypes } from '../const.js';


export default class Presenter {
  #pointsContainer = new TripsContainer();
  #headerElement;
  #pointsElement;
  #pointsModel;
  #filterModel;

  #sortComponent = null;
  #currentSort = SortTypes.DEFAULT;
  #primaryPoints = [];


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

    this.#primaryPoints = this.#points;

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

  #sortPoints = (sortType) => {
    this.#currentSort = sortType;
    switch (sortType) {
      case SortTypes.BY_TIME:
        this.#points.sort(sortByTime);
        break;
      case SortTypes.BY_NAME:
        this.#points.sort(sortByEvent);
        break;
      case SortTypes.BY_PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortTypes.BY_OFFERS:
        this.#points.sort(sortByOffers);
        break;
      case SortTypes.DEFAULT:
        this.#points.sort(sortByDefault);
        break;
    }


    this.#clearPoints();
    this.#renderPoints();
  };

  #onSort = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }
    this.#sortPoints(sortType);
  };

  #renderSort(){
    this.#sortComponent = new SortView({
      onSort: this.#onSort
    });
    render(this.#sortComponent, this.#pointsElement);
  }

  #renderFilters(){
    render(new FiltersView(this.#filterModel), this.#headerElement);
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
      this.#sortPoints(this.#currentSort);
    }
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderComponents() {
    this.#renderFilters();
    this.#renderSort();
    this.#initPoints();
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }


  #onPointChange = (newPoint) => {
    this.#points = updateItem(this.#points, newPoint);
    this.#primaryPoints = updateItem(this.#primaryPoints, newPoint);
    this.#pointPresenters.get(newPoint.id).init(newPoint);
  };
}