import { render, replace, remove } from '../framework/render';
import EditorView from '../view/editor-view';
import TripsView from '../view/points-view';
import { PresenterModes } from '../const';


export default class PointPresenter {

  #pointComponent = null;
  #editComponent = null;


  #point = null;

  #pointsContainer = null;
  #onPointChange = null;
  #onModeChange = null;
  #mode = PresenterModes.DEFAULT;

  constructor({pointsContainer, onPointChange, onModeChange}){
    this.#pointsContainer = pointsContainer;
    this.#onPointChange = onPointChange;

    this.#onModeChange = onModeChange;
  }

  #onDocumentKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToPoint();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    }
  };

  init(point) {

    const prevPoint = this.#pointComponent;
    const prevEdit = this.#editComponent;

    this.#point = point;

    this.#pointComponent = new TripsView(
      {
        point: this.#point,
        onTripClick: () => {
          this.#replacePointToEdit();
          document.addEventListener('keydown', this.#onDocumentKeyDown);
        },
        onFavoriteClick: this.#onFavoriteClick,
      }
    );

    this.#editComponent = new EditorView(
      {
        point: this.#point,
        onEditClick: () =>{
          this.#replaceEditToPoint();
          document.removeEventListener('keydown', this.#onDocumentKeyDown);
        },
        onPointChange: this.#onPointChange
      }
    );
    if(prevPoint === null || prevEdit === null){
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if(this.#mode === PresenterModes.DEFAULT){
      replace(this.#pointComponent, prevPoint);
    }

    if(this.#mode === PresenterModes.EDITING){
      replace(this.#editComponent, prevEdit);
    }

    remove(prevPoint);
    remove(prevEdit);
  }

  resetView(){
    if (this.#mode !== PresenterModes.DEFAULT){
      this.#replaceEditToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #replacePointToEdit () {
    replace(this.#editComponent, this.#pointComponent);
    this.#onModeChange();
    this.#mode = PresenterModes.EDITING;
  }

  #replaceEditToPoint () {
    replace(this.#pointComponent, this.#editComponent);
    this.#mode = PresenterModes.DEFAULT;
  }

  #onFavoriteClick = ( ) => {
    this.#onPointChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
