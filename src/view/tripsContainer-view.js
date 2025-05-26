import AbstractView from '../framework/view/abstract-view.js';

function createTripsContainerTemplate() {
  return (
    `
    <ul class="trip-events__list"></ul>
    `
  );
}

export default class TripsContainer extends AbstractView{
  get template() {
    return createTripsContainerTemplate();
  }
}
