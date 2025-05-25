import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate (filter, currentFilterType){
  const {type, count} = filter;

  return `<div class="trip-filters__filter">
  <input  ${count === 0 ? 'disabled' : ''} id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${type} ${currentFilterType === type ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>
    `;
}

function createFiltersTemplate(filterItems, currentFilterType) {
  return (
    `<div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
            ${filterItems.map((filter) => createFilterTemplate(filter, currentFilterType)).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
    </div>`
  );
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }


  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

}
