import { DATE_FORMAT_EDIT } from '../const/date-const.js';
import { humanizePointDueDate } from '../utils/date-utils.js';
import { BlancPoint } from '../const/point-const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createPictureTemplate = (picture) =>
  `
  <img class="event__photo" src="${picture.src}" alt="Event photo">
  `;

const createPicturesTemplate = (photos) => photos.map((photo) => createPictureTemplate(photo)).join('');

const createOption = (type, isActive) => `
<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isActive ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`;

const createOptionsTemplate = (currentType, allTypes) =>
  (`<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${allTypes.map((type) =>
      createOption(type, currentType === type)
    ).join('')} 
    </fieldset>
  </div>`);

const createDestinationTemplate = (destination) => `<option value="${destination}">${destination}</option>`;

const createDestinationsTemplate = (curType, curDestination, allDestinations, isDisabled) =>
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-${curDestination}">
      ${curType}
    </label>

    <input type="text" name="event-destination" class="event__input  event__input--destination" value="${curDestination ? he.encode(allDestinations.find(({id}) => id === curDestination).name) : ''}" list="destination-list-1" id="event-destination-${curDestination}" ${isDisabled ? 'disabled' : ''}>
    <datalist id='destination-list-1'>
      ${curDestination !== '' ?
    allDestinations.map((destination) =>
      createDestinationTemplate(destination.name, destination.id === curDestination)
    ).join('') :
    allDestinations.map((destination) =>
      createDestinationTemplate(destination.name, false)
    ).join('')
}
  </datalist>
  </div>`;

const createOfferEditTemplate = (currentTypeOffers, offers, isDisabled) => {
  let res = '';

  currentTypeOffers.forEach((offer) => {
    let isActive = false;
    if(offers){
      isActive = offers.some((offerId) => offerId === offer.id);
    } else{
      return '';
    }
    res += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.id}-1" type="checkbox" name="${offer.id}" ${ isActive ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
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


const createOffersEditTemplate = (currentTypeOffers, offers, isDisabled) => {
  if (!currentTypeOffers.length){
    return '';
  }
  return `
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOfferEditTemplate(currentTypeOffers, offers, isDisabled) }
    </div>
  </section>
  `;
};

const createButtonsTemplate = (isNew, isDisabled, isDeleting, isSaving) =>{
  const saveButtonText = isSaving ? 'Saving...' : 'Save';
  const resetButtonText = isNew ? 'Cancel' : 'Delete';

  return(`
  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${saveButtonText}</button>
  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : resetButtonText}</button>
  ${isNew ? '' : `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''} >`}

`);
};

const createDestinationsSectionTemplate = (destination, curDestinationData) => {
  if(curDestinationData && !curDestinationData.description || !destination){
    return '';
  }
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destination ? curDestinationData.description : ''}</p>
  ${
  curDestinationData && curDestinationData.pictures.length !== 0 ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${createPicturesTemplate(curDestinationData.pictures)}
      </div>
    </div>
  </section> ` :
    ''

}`;
};

const createEditorViewTemplate = (point, allOffers, allDestinations) =>{

  const curDestinationData = allDestinations.find(({id}) => id === point.destination);

  const {type, destination, cost, date, offers, isNew, isDeleting, isSaving, isDisabled} = point;

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
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
    
        ${createOptionsTemplate(type, Object.keys(allOffers))}
        
      </div>
    
      ${createDestinationsTemplate(type, destination, allDestinations, isDisabled)}
    
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input  class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDueDate(date.start, DATE_FORMAT_EDIT)}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDueDate(date.end, DATE_FORMAT_EDIT)}" ${isDisabled ? 'disabled' : ''}>
      </div>
    
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}" ${isDisabled ? 'disabled' : ''}>
      </div>
        ${createButtonsTemplate(isNew, isDisabled, isDeleting, isSaving)}
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${createOffersEditTemplate(currentTypeOffers, offers, isDisabled)}

      ${createDestinationsSectionTemplate(destination, curDestinationData !== undefined ? curDestinationData : null)}
    </section>
    </form>
    </li>


    `

  );
};
export default class EditorView extends AbstractStatefulView{
  #onSubmit;
  #datepickerFrom;
  #datepickerTo;
  #deletePoint;
  #point;
  #isCreateNewPoint;

  #allOffers;
  #allDestinations;

  constructor({point = BlancPoint, onSubmit, deletePoint, allOffers, allDestinations}) {
    super();

    if (point === BlancPoint){
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
    return createEditorViewTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    } else if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditorView.parsePointToState(point, this.#isCreateNewPoint),
    );
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
    if(!this._state.isNew){
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#onFormClose);
    }
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#onDestinationInput);

    this.element.querySelector('.event__type-group')
      .addEventListener('input', this.#onTypeChange);

    const checkboxOffers = this.element.querySelectorAll('.event__offer-checkbox');
    checkboxOffers.forEach((checkbox) => {
      checkbox.addEventListener('change', this.#onOffersChange);
    });

    this.#setDatepickers();
  }

  #setDatepickers() {
    const timeInputs = this.element.querySelectorAll('.event__input--time');
    if (this._state.date) {
      this.#datepickerFrom = flatpickr(
        timeInputs[0],
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.date.start ? dayjs(this._state.date.start).format('DD/MM/YY HH:mm') : '',
          onChange: this.#onDateChangeFrom,
        },
      );
      this.#datepickerTo = flatpickr(
        timeInputs[1],
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.date.end ? dayjs(this._state.date.end).format('DD/MM/YY HH:mm') : '',
          onChange: this.#onDateChangeTo,
        }
      );
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
    this.updateElement({
      cost: this._state.cost,
    });
    this.#onSubmit(EditorView.parseStateToPoint(this._state));
  };

  #onDestinationInput = (evt) => {
    evt.preventDefault();
    const curDestination = this.#allDestinations.find(({name}) => name === evt.target.value);

    this.updateElement(curDestination ? {
      destination: curDestination.id,
    } : {
      destination: '',
    }
    );
  };

  #onPriceInput = (evt) => {
    const regex = /^\d{1,6}$/;
    if (regex.test(evt.target.value)) {
      this._state.cost = evt.target.value;
    } else if (evt.target.value === '') {
      this._state.cost = '';
    }
  };


  static parsePointToState(point, isNew){

    return {
      ...point,
      isNew: isNew,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state){
    const point = {...state };

    delete point.isNew;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;

  }
}
