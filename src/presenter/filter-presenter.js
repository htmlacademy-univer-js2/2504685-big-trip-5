import { FilterTypes } from '../const/point-const';
import FiltersView from '../view/filters-view';
import { render, replace, remove } from '../framework/render';
import { FiltersMethods } from '../utils/filter-utils';
import { UpdateTypes } from '../const/api-const';

export default class FilterPresenter {
  #filterContainer;
  #filterModel;
  #pointsModel;
  #filterComponent;

  constructor({filterContainer, filterModel, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;
    return Object.values(FilterTypes).map((type) => ({
      type,
      count: FiltersMethods[type](points).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#onFilterTypeChange
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy() {
    remove(this.#filterComponent);
    remove(this.#filterContainer);
  }

  #onModelEvent = () => {
    this.init();
  };

  #onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
  };

}
