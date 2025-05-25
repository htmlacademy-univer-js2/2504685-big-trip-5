import { DATE_FORMAT_DAY_RESULTS } from '../const/date-const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDueDate } from '../utils/date-utils.js';

function createInfoTemplate({totalCount, destinations, isThree, dateStart, dateEnd}) {

  return (
    `
    <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
        ${ destinations.length === 1 ?
      `<h1 class="trip-info__title">${destinations[0]}
      <p class="trip-info__dates">${humanizePointDueDate(dateStart, DATE_FORMAT_DAY_RESULTS)}&nbsp;&mdash;&nbsp;${humanizePointDueDate(dateEnd, DATE_FORMAT_DAY_RESULTS)}</p>
      </div>`
      :
      `<h1 class="trip-info__title">${destinations[0]} &mdash; ${isThree || destinations.length === 2 ? destinations[1] : '...'} ${ destinations.length !== 2 ? `&mdash; ${destinations[isThree ? 2 : 1]}` : ''}</h1>
        <p class="trip-info__dates">${humanizePointDueDate(dateStart, DATE_FORMAT_DAY_RESULTS)}&nbsp;&mdash;&nbsp;${humanizePointDueDate(dateEnd, DATE_FORMAT_DAY_RESULTS)}</p>
        </div>
      `}
        <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCount}</span>
        </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #info;

  constructor(info){
    super();

    this.#info = info;
  }

  get template() {
    return this.#info ? createInfoTemplate(this.#info) : '<div></div>';
  }
}
