import { render, replace, remove } from '../framework/render';
import EditorView from '../view/editor-view';
import TripsView from '../view/points-view';
import {UserActions, UpdateTypes } from '../const/api-const';
import { isEscKey } from '../utils/utils';
import { PresenterModes } from '../const/point-const';


export default class PointPresenter {
  #pointComponent;
  #editComponent;
  #point;
  #pointsContainer;
  #onPointChange;
  #onModeChange;
  #mode;
  #offers;
  #destinations;

  constructor({offers, destinations, pointsContainer, onPointChange, onModeChange}){
    this.#pointsContainer = pointsContainer;
    this.#onPointChange = onPointChange;
    this.#offers = offers;
    this.#onModeChange = onModeChange;
    this.#destinations = destinations;
    this.#mode = PresenterModes.DEFAULT;
  }

  init(point) {

    const prevPoint = this.#pointComponent;
    const prevEdit = this.#editComponent;


    const curTypeOffers = this.#offers[point.type];

    const curTypeDestination = this.#destinations.find(({ id }) => id === point.destination);

    this.#point = {
      ...point,
    };

    this.#createTripsView(curTypeOffers, curTypeDestination);
    this.#createEditorView(curTypeDestination);

    if(!prevPoint || !prevEdit){
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if(this.#mode === PresenterModes.DEFAULT){
      replace(this.#pointComponent, prevPoint);
    }

    if(this.#mode === PresenterModes.EDITING){
      replace(this.#pointComponent, prevEdit);
      this.#mode = PresenterModes.DEFAULT;
    }

    remove(prevPoint);
    remove(prevEdit);
  }

  setSaving() {
    if (this.#mode === PresenterModes.EDITING) {
      this.#editComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === PresenterModes.EDITING) {
      this.#editComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAbording() {
    if (this.#mode === PresenterModes.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };


    this.#editComponent.shake(resetFormState);
  }


  resetView(){
    if (this.#mode !== PresenterModes.DEFAULT){
      this.#editComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #createEditorView(curTypeDestination) {
    this.#editComponent = new EditorView(
      {
        point: this.#point,
        allOffers: this.#offers,
        allDestinations: this.#destinations,
        curTypeDestination: curTypeDestination,
        onSubmit: this.#onFormSubmit,
        deletePoint: this.#onDeletePoint
      }
    );
  }

  #createTripsView(curTypeOffers, curTypeDestination) {
    this.#pointComponent = new TripsView(
      {
        point: this.#point,
        offersObject: curTypeOffers,
        curTypeDestination: curTypeDestination,
        onTripClick: () => {
          this.#replacePointToEdit();
          document.addEventListener('keydown', this.#onDocumentKeyDown);
        },
        onFavoriteClick: this.#onFavoriteClick,
        onSubmit: this.#onFormSubmit
      }
    );
  }

  #replacePointToEdit () {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    this.#onModeChange();
    this.#mode = PresenterModes.EDITING;
  }

  #replaceEditToPoint () {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    this.#mode = PresenterModes.DEFAULT;
  }

  #onDeletePoint = (point) =>{
    this.#onPointChange(
      UserActions.DELETE_POINT,
      UpdateTypes.MAJOR,
      point,
    );
  };

  #onDocumentKeyDown = (evt) => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this.#editComponent.reset(this.#point);
      this.#replaceEditToPoint();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    }
  };

  #onFormSubmit = (update) => {
    if(update === undefined){
      this.#editComponent.reset(this.#point);
      this.#replaceEditToPoint();
      return;
    }

    this.#onPointChange(
      UserActions.UPDATE_POINT,
      UpdateTypes.MINOR,
      update
    );
  };

  #onFavoriteClick = () => {
    this.#onPointChange(
      UserActions.UPDATE_POINT,
      UpdateTypes.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };
}
