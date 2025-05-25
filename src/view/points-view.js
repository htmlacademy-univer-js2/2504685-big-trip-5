import { countDuration, humanizeTaskDueDate } from '../utils.js';
import {DATE_FORMAT_POINT_DAY, DATE_FORMAT_POINT_HOURS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createOffers = (offers) => {
  let res = '';
  offers.forEach((offer) => {
    if(offer.checked){
      res += `
      <li class="event__offer">
        <span class="event__offer-title">${offer.text}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.cost}</span>
      </li>
      `;
    }
  });
  return res;
};


function createPointsTemplate({type, destination, cost, date, activeOffers, isFavorite}) {
  return (
    `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${date.start}">${humanizeTaskDueDate(date.start, DATE_FORMAT_POINT_DAY)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${date.start}">${humanizeTaskDueDate(date.start, DATE_FORMAT_POINT_HOURS)}</time>
            &mdash;
            <time class="event__end-time" datetime="${date.end}}">${humanizeTaskDueDate(date.end, DATE_FORMAT_POINT_HOURS)}</time>
          </p>
          <p class="event__duration">${countDuration(date.start, date.end)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffers(activeOffers)}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `
  );
}

export default class TripsView extends AbstractView{
  #point;
  #pointClick;
  #onFavoriteClick;

  constructor({point, onTripClick: onPointClick, onFavoriteClick}){
    super();
    this.#point = point;
    this.#pointClick = onPointClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn ').addEventListener('click', this.#onFavoriteClick);
  }

  get template() {
    return createPointsTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#pointClick();
  };
}