import SortView from '../view/sort-view.js';
import TripsContainer from '../view/tripsContainer-view.js';
import {remove, render} from '../framework/render.js';
import EmptyPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import { sortByTime, sortByPrice, sortByDefault} from '../utils/sort-utils.js';
import {FiltersMethods } from '../utils/filter-utils.js';
import { SortTypes, FilterTypes } from '../const/point-const.js';
import FilterPresenter from './filter-presenter.js';
import AddPointPresenter from './add-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import addPointButtonView from '../view/add-point-button-view.js';
import Observable from '../framework/observable.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripInfoPresenter from './trip-info-presenter.js';
import ErrorPointsView from '../view/error-points-view.js';
import { TimeLimits, UpdateTypes, UserActions } from '../const/api-const.js';

export default class Presenter extends Observable{
  #pointsContainer = new TripsContainer();
  #mainContainerElement;
  #tripMain;
  #loadingComponent;
  #pointsModel;
  #filterModel;
  #noPointsComponent;
  #tripInfoPresenter;
  #sortElement;
  #currentSort;
  #filterType;
  #pointPresenters;
  #isLoading = true;
  #offersModel;
  #destinationsModel;
  #addPointPresenter;
  #filtersPresenter;
  #errorPointsView;
  #isError;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimits.LOWER,
    upperLimit: TimeLimits.UPPER
  });

  #addPointButtonComponent;

  constructor(
    {
      tripsSection,
      pointsModel,
      filterModel,
      offersModel,
      destinationsModel,
      tripMain,
    }){

    super();

    this.#mainContainerElement = tripsSection;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#tripMain = tripMain;
    this.#isError = false;
    this.#sortElement = null;
    this.#currentSort = SortTypes.DEFAULT;
    this.#filterType = FilterTypes.ALL;
    this.#pointPresenters = new Map();
    this.#addPointButtonComponent = new addPointButtonView(this.#onAddPointClick);

    Promise.all([
      this.#pointsModel.init(),
      this.#offersModel.init(),
      this.#destinationsModel.init(),
    ])
      .then(() => {
        this._notify(UpdateTypes.INIT);
      })
      .catch(() => {
        this.#isError = true;
      })
      .finally(() => {
        this.#isLoading = false;
        this.#renderFilters();
        render(this.#addPointButtonComponent, this.#tripMain);
        this._notify(UpdateTypes.INIT);
      });

    this.addObserver(this.#onModelEvent);
    this.#pointsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;

    const filteredPoints = FiltersMethods[this.#filterType](points);
    switch (this.#currentSort) {
      case SortTypes.BY_TIME:
        return filteredPoints.sort(sortByTime);
      case SortTypes.BY_PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortTypes.DEFAULT:
        return filteredPoints.sort(sortByDefault);
    }
    return filteredPoints;
  }


  init() {
    this.#renderComponents();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      {
        offers: this.#offersModel.offers,
        destinations: this.#destinationsModel.destinations,
        pointsContainer: this.#pointsContainer.element,
        onPointChange: this.#onViewAction,
        onModeChange: this.#onModeChange,
      }
    );
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #createPoint() {
    this.#currentSort = SortTypes.DEFAULT;
    this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.ALL);
    this.#addPointPresenter.init();
  }

  #onModeChange = () => {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEmptyPoints(){
    this.#noPointsComponent = new EmptyPointsView({
      filterType: this.#filterType
    });
    render(this.#noPointsComponent, this.#mainContainerElement);
  }

  #renderErrorPoints(){
    this.#errorPointsView = new ErrorPointsView();

    render(this.#errorPointsView, this.#mainContainerElement);
  }

  #renderFilters(){
    this.#filtersPresenter = new FilterPresenter({
      filterContainer: this.#tripMain,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });
    this.#filtersPresenter.init();
  }

  #renderTripInfo(){
    this.#tripInfoPresenter = new TripInfoPresenter({
      tripMain: this.#tripMain,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
    });
    this.#tripInfoPresenter.init(this.points);
  }

  #renderLoading(){
    this.#loadingComponent = new LoadingView();

    render(this.#loadingComponent, this.#mainContainerElement);
  }

  #renderSort(){
    this.#sortElement = new SortView({
      onSort: this.#onSort,
      currentSort: this.#currentSort
    });

    render(this.#sortElement, this.#mainContainerElement);
  }

  #clearComponents({ resetSortType = false} = {}) {

    if(!this.#isError){
      this.#addPointPresenter.destroy();
    }


    this.#clearPoints();

    remove(this.#sortElement);
    remove(this.#loadingComponent);

    if(this.#errorPointsView){
      remove(this.#errorPointsView);
    }
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    if (resetSortType) {
      this.#currentSort = SortTypes.DEFAULT;
    }
  }

  #renderPointsContainer(){
    render(this.#pointsContainer, this.#mainContainerElement);
  }

  #initPoints(){
    this.#renderPointsContainer();
    if(this.#pointsModel.points.length === 0){
      this.#renderEmptyPoints();
    }
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderComponents() {

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if(this.#isError){
      this.#renderErrorPoints();
    }else{
      if(!this.#tripInfoPresenter){
        this.#renderTripInfo();
      }
      this.#renderSort();
      this.#initPoints();
      this.#tripInfoPresenter.init(this.points);
      this.#renderPoints(this.points);
    }

  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #onSort = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }
    this.#currentSort = sortType;

    this.#clearComponents();
    this.#renderComponents();
  };

  #onViewAction = async (actionType, updateType, newPoint) => {
    this.#uiBlocker.block();
    try {
      switch (actionType) {
        case UserActions.UPDATE_POINT:
          this.#pointPresenters.get(newPoint.id).setSaving();
          await this.#pointsModel.updatePoint(updateType, newPoint);
          break;
        case UserActions.ADD_POINT:
          this.#addPointPresenter.setSaving();
          await this.#pointsModel.addPoint(updateType, newPoint);
          break;
        case UserActions.DELETE_POINT:
          this.#pointPresenters.get(newPoint.id).setDeleting();
          await this.#pointsModel.deletePoint(updateType, newPoint);
          break;
      }
    } catch (err) {
      switch (actionType) {
        case UserActions.UPDATE_POINT:
          this.#pointPresenters.get(newPoint.id).setAbording();
          break;
        case UserActions.ADD_POINT:
          this.#addPointPresenter.setAbording();
          break;
        case UserActions.DELETE_POINT:
          this.#pointPresenters.get(newPoint.id).setAbording();
          break;
      }
    } finally {
      this.#uiBlocker.unblock();
    }
  };

  #onAddPointClick = () => {

    this.#createPoint();
    this.#addPointButtonComponent.element.disabled = true;

    if(this.#noPointsComponent){
      remove(this.#noPointsComponent);
    }

  };

  #onModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateTypes.MINOR:
        this.#clearComponents();
        this.#renderComponents();
        break;
      case UpdateTypes.MAJOR:
        this.#clearComponents({resetSortType : true});
        this.#renderComponents();
        break;
      case UpdateTypes.INIT:
        if(!this.#isError){
          this.#addPointPresenter = new AddPointPresenter({
            pointsContainer: this.#pointsContainer,
            onDataChange: this.#onViewAction,
            onDestroy: () => {
              this.#addPointButtonComponent.element.disabled = false;
              if(!this.points.length && !this.#isError){
                this.#renderEmptyPoints();
              }
            },
            allOffers: this.#offersModel.offers,
            allDestinations: this.#destinationsModel.destinations,
          });
        }

        this.#isLoading = false;
        this.#clearComponents();
        this.#renderComponents();

        break;
    }
  };

}
