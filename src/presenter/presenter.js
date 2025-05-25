import SortView from '../view/sort-view.js';
import FiltersView from '../view/filters-view.js';
import TripsContainer from '../view/tripsContainer-view.js';
import EditorView from '../view/editor-view.js';
import TripsView from '../view/trips-view.js';
import {render, replace} from '../framework/render.js';
import EmptyPointsView from '../view/no-points-view.js';

export default class Presenter {
  #taskListComponent = new TripsContainer();
  #headerElement;
  #tripsElement;
  #pointsModel;
  #filterModel;

  #points = [];
  constructor({headerElement, tripsElement, pointsModel, filterModel}) {
    this.#headerElement = headerElement;
    this.#tripsElement = tripsElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.renderComponents();
  }

  #renderPoint = (point) => {
    const onDocumentKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', onDocumentKeyDown);
      }
    };

    const tripComponent = new TripsView(
      {
        point,
        onTripClick: () => {
          replacePointToEdit();
          document.addEventListener('keydown', onDocumentKeyDown);
        }
      }
    );
    const editComponent = new EditorView(
      {
        point,
        onEditClick: () =>{
          replaceEditToPoint();
          document.removeEventListener('keydown', onDocumentKeyDown);
        }
      }
    );

    function replacePointToEdit() {
      replace(editComponent, tripComponent);
    }

    function replaceEditToPoint() {
      replace(tripComponent, editComponent);
    }

    render(tripComponent, this.#taskListComponent.element);
  };

  renderComponents() {
    render(new FiltersView(this.#filterModel), this.#headerElement);
    render(new SortView(), this.#tripsElement);
    render(this.#taskListComponent, this.#tripsElement);
    if(this.#points.length === 0){
      render(new EmptyPointsView(), this.#tripsElement);
    }
    else{
      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }
}
