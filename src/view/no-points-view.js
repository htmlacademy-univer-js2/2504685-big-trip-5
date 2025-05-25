import AbstractView from '../framework/view/abstract-view';

import {FilterTypes} from '../const.js';

const noPointsMessage = {
  [FilterTypes.ALL]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.PAST]: 'There are no past events now',
};

const createEmptyPoint = (filterType) =>
  `
    <p class="trip-events__msg">${noPointsMessage[filterType]}</p>
  `;

export default class EmptyPointsView extends AbstractView{

  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyPoint(this.#filterType);
  }
}
