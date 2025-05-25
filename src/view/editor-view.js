import { DATE_FORMAT_EDIT } from '../const.js';
import { humanizeTaskDueDate } from '../utils.js';
import { BLANC_TEST } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createPicture = (picture) =>
  `
  <img class="event__photo" src="${picture.src}" alt="Event photo">
  `;

const createPictures = (photos) => photos.map((photo) => createPicture(photo)).join('');

const createOption = (type, isActive) => `
<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isActive ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`;

const createOptions = (currentType, allTypes) =>
  (`<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${allTypes.map((type) =>
      createOption(type, currentType === type)
    ).join('')} 
    </fieldset>
  </div>`);

const createDestination = (destination, isActive) => `<option ${isActive ? 'selected' : ''} value="${destination}">${destination}</option>`;

const createDestinations = (curType, curDestination, allDestinations) =>
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${curType}
    </label>

    <select class="event__input  event__input--destination" id="destination-list-1">
      ${curDestination !== '' ?
    allDestinations.map((destination) =>
      createDestination(destination.name, destination.id === curDestination)
    ).join('') :
    allDestinations.map((destination) =>
      createDestination(destination.name, false)
    ).join('')
}
  }
    </select>
  </div>`;

const createOfferEdit = (currentTypeOffers, offers) => {
  let res = '';


  currentTypeOffers.forEach((offer) => {
    let isActive = false;
    if(offers){
      isActive = offers.some((offerId) => offerId === offer.id);
    }
    res += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.id}-1" type="checkbox" name="${offer.id}" ${ isActive ? 'checked' : ''}>
      <label class="event__offer-label" for="${offer.id}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
    `;
  });
  return res;
};


const createOffersEdit = (currentTypeOffers, offers) =>
  `
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOfferEdit(currentTypeOffers, offers) }
    </div>
  </section>
  `;

const createEditorView = (point, allOffers, allDestinations) =>{
  const curDestinationData = allDestinations.find(({id}) => id === point.destination);

  const {type, destination, cost, date, offers, isNew} = point;

  const currentTypeOffers = allOffers[point.type];

  return (
    `
    
    <li><form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    
        ${createOptions(type, Object.keys(allOffers))}
        
      </div>
    
      ${createDestinations(type, destination, allDestinations)}
    
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeTaskDueDate(date.start, DATE_FORMAT_EDIT)}">
        &mdash;
        <label claыss="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeTaskDueDate(date.end, DATE_FORMAT_EDIT)}">
      </div>
    
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
      </div>
    
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset"?>${isNew ? 'Cancel' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${createOffersEdit(currentTypeOffers, offers)}

    
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination ? curDestinationData.description : ''}</p>
    
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPictures(destination ? curDestinationData.pictures : [])}
          </div>
        </div>
      </section>
    </section>
    </form>
    </li>


    `

  );};
export default class EditorView extends AbstractStatefulView{
  #onSubmit;
  #datepickerFrom;
  #datepickerTo;
  #deletePoint;
  #point;
  #isCreateNewPoint;

  #allOffers;
  #allDestinations;

  constructor({point = BLANC_TEST, onSubmit, deletePoint, allOffers, allDestinations}) {
    super();
    if (point === BLANC_TEST){
      this.#isCreateNewPoint = true;
    }
    this._setState(EditorView.parsePointToState(point, this.#isCreateNewPoint));

    this.#onSubmit = onSubmit;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this._restoreHandlers();

    this.#point = point;
    this.#deletePoint = deletePoint;

  }

  get template() {
    return createEditorView(this._state, this.#allOffers, this.#allDestinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    else if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #onDateChangeFrom = ([userDate]) => {
    this.updateElement({
      date: {
        start: userDate,
        end: this._state.date.end
      },
    });
  };

  #onDateChangeTo = ([userDate]) => {
    this.updateElement({
      date: {
        start: this._state.date.start,
        end: userDate
      }
    });
  };

  #setDatepickers() {
    const timeInputs = this.element.querySelectorAll('.event__input--time');
    if (this._state.date) {
      this.#datepickerFrom = flatpickr(
        timeInputs[0],
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: '',
          onChange: this.#onDateChangeFrom,
        },
      );
      this.#datepickerTo = flatpickr(
        timeInputs[1],
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: '',
          onChange: this.#onDateChangeTo,
        }
      );
    }
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#onPriceInput);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#onDeleteButtonClick);

    this.element
      .addEventListener('submit', this.#onFormSubmit);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onFormClose);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#onDestinationChange);

    this.element.querySelector('.event__type-group')
      .addEventListener('input', this.#onTypeChange);

    const checkboxOffers = this.element.querySelectorAll('.event__offer-checkbox');
    checkboxOffers.forEach((checkbox) => {
      checkbox.addEventListener('change', this.#onOffersChange);
    });

    this.#setDatepickers();
  }

  #onOffersChange = (evt) => {
    const offerId = evt.target.name;

    const newOffers = this._state.offers.includes(offerId) ?
      this._state.offers.filter((offer) => offer !== offerId) :
      [...this._state.offers, offerId];

    this.updateElement({
      offers: newOffers,
    });
  };


  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  reset(point) {
    this.updateElement(
      EditorView.parsePointToState(point, this.#isCreateNewPoint),
    );
  }

  #onFormClose = (evt) => {
    evt.preventDefault();
    this.reset(this.#point);
    this.#onSubmit();
  };

  #onDeleteButtonClick = (evt) => {
    evt.preventDefault();
    this.#deletePoint(EditorView.parseStateToPoint(this._state));
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onSubmit(EditorView.parseStateToPoint(this._state));
    this.#onFormClose(evt);
  };

  #onDestinationChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: this.#allDestinations.find(({name}) => name === evt.target.value).id,
    });
  };

  #onPriceInput = (evt) => {
    const regex = /^\d{1,6}$/;
    if (regex.test(evt.target.value)) {
      this.updateElement({
        cost: evt.target.value,
      });
    }
  };

  static parsePointToState(point, isNew){

    return {
      ...point,
      isNew: isNew,
    };
  }

  static parseStateToPoint(state){
    const point = {...state };
    delete point.isNew;
    return point;
  }
}
