import {remove, render, RenderPosition} from '../framework/render.js';
import EditorView from '../view/editor-view.js';
import {UserActions, UpdateTypes} from '../const/api-const.js';
import { isEscKey } from '../utils/utils.js';

export default class AddPointPresenter {
  #pointsContainer;
  #onDataChange;
  #onDestroy;
  #editorComponent;
  #offers;
  #destinations;

  constructor({pointsContainer, onDataChange, onDestroy, allOffers, allDestinations}) {
    this.#pointsContainer = pointsContainer.element;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
    this.#offers = allOffers;
    this.#destinations = allDestinations;
  }

  init() {
    if (this.#editorComponent) {
      return;
    }

    this.#editorComponent = new EditorView({
      allOffers: this.#offers,
      allDestinations: this.#destinations,
      onSubmit: this.#onFormSubmit,
      deletePoint: this.#onDeleteClick
    });

    render(this.#editorComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy() {
    if (!this.#editorComponent) {
      return;
    }

    this.#onDestroy();

    remove(this.#editorComponent);
    this.#editorComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  setSaving() {
    this.#editorComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAbording() {
    const resetFormState = () => {
      this.#editorComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editorComponent.shake(resetFormState);
  }


  #onFormSubmit = (point) => {
    if(point === undefined){
      return;
    }
    this.#onDataChange(
      UserActions.ADD_POINT,
      UpdateTypes.MINOR,
      {...point, isFavorite : false},
    );
  };

  #onDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
