
import { SortTypes } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortTemplate(sort) {
  return (
    `
        <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
                <input id="sort-day" class="trip-sort__input visually-hidden" data-sort-type="${SortTypes.DEFAULT}" type="radio" name="trip-sort" value="sort-day" ${sort === 'default' ? 'checked' : ''}>
                <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
                <input id="sort-event" class="trip-sort__input  visually-hidden" data-sort-type="${SortTypes.BY_NAME}" type="radio" name="trip-sort" value="sort-event" disabled>
                <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
                <input id="sort-time" class="trip-sort__input  visually-hidden" data-sort-type="${SortTypes.BY_TIME}" type="radio" name="trip-sort" value="sort-time" ${sort === 'time' ? 'checked' : ''} >
                <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
                <input id="sort-price" class="trip-sort__input  visually-hidden" data-sort-type="${SortTypes.BY_PRICE}" type="radio" name="trip-sort" value="sort-price" ${sort === 'price' ? 'checked' : ''} > 
                <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
                <input id="sort-offer" class="trip-sort__input  visually-hidden" data-sort-type="${SortTypes.BY_OFFERS}" type="radio" name="trip-sort" value="sort-offer" disabled>
                <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
        </form>`
  );
}

export default class SortView extends AbstractView {
  #currentSort;
  #onSort;

  constructor({currentSort, onSort}){
    super();
    this.#currentSort = currentSort;
    this.#onSort = onSort;

    this.element.addEventListener('click', this.#onSortClick);
  }

  get template() {
    return createSortTemplate(this.#currentSort);
  }

  #onSortClick = (evt) => {
    if(evt.target.tagName !== 'INPUT'){
      return;
    }
    this.#onSort(evt.target.dataset.sortType);
  };
}
