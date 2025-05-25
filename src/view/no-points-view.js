import AbstractView from '../framework/view/abstract-view';


const createEmptyPoint = () =>
  `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;

export default class EmptyPointsView extends AbstractView{

  constructor(){
    super();
  }

  get template() {
    return createEmptyPoint();
  }
}
