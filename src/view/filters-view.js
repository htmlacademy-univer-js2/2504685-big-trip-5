import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate (model, view){
  let result = '';
  view.forEach((filter) => {
    result += `<div class="trip-filters__filter">
    <input  ${model.isEmpty ? 'disabled' : ''} id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>
    `;
  });
  return result;
}

function createFiltersTemplate(model, view) {
  return (
    `<div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
            ${createFilterTemplate(model, view)}
            <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
    </div>`
  );
}

export default class FiltersView extends AbstractView {
  #filtersModel;
  constructor(filtersModel) {
    super();
    this.#filtersModel = filtersModel;
  }

  get template() {
    const view = Object.keys(this.#filtersModel.filters);
    return createFiltersTemplate(
      this.#filtersModel, view
    );
  }

}
