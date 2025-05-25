import Presenter from './presenter/presenter';
import PointsModel from './model/point-model';
import FiltersModel from './model/filters-model';
import addPointButtonView from './view/add-point-button-view';
import { render } from './framework/render';


const pageBody = document.querySelector('.page-body');
const mainContainer = pageBody.querySelector('.trip-events');
const pointsContainer = pageBody.querySelector('.trip-events__list');
const headerElement = pageBody.querySelector('.trip-controls');

const points = new PointsModel();

const filterModel = new FiltersModel();

const presenter = new Presenter(
  {
    controlsDiv: headerElement,
    tripsSection: mainContainer,
    pointsUl: pointsContainer,
    pointsModel: points,
    filterModel: filterModel,
    onAddTaskClose: handleNewPointFormClose
  }
);

const newTaskButtonComponent = new addPointButtonView({
  onClick: handleAddPointButtonClick
});

function handleNewPointFormClose() {
  newTaskButtonComponent.element.disabled = false;
}

function handleAddPointButtonClick() {
  presenter.createPoint();
  newTaskButtonComponent.element.disabled = true;
}

render(newTaskButtonComponent, document.querySelector('.page-body__container'));

presenter.init();
