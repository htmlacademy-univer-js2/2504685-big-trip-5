import AbstractView from '../framework/view/abstract-view';

import {FilterTypes} from '../const/point-const';

const noPointsMessage = {
  [FilterTypes.ALL]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.PAST]: 'There are no past events now',
};

const createEmptyPointTemplate = (filterType) =>
  `
    <p class="trip-events__msg">${noPointsMessage[filterType]}</p>
  `;

export default class EmptyPointsView extends AbstractView{

  #filterType;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyPointTemplate(this.#filterType);
  }
}
