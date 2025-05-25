import AbstractView from '../framework/view/abstract-view';

const createErrorPointsTemplate = () =>
  `
    <p class="trip-events__msg">Failed to load latest route information</p>
  `;

export default class ErrorPointsView extends AbstractView{

  constructor() {
    super();
  }

  get template() {
    return createErrorPointsTemplate();
  }
}
