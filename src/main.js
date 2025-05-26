import Presenter from './presenter/presenter';
import PointsModel from './model/point-model';
import FiltersModel from './model/filters-model';
import PointsApiService from './api-service/point-api-service';
import { AUTHORIZATION, END_POINT } from './const/api-const';
import OffersModel from './model/offers-model';
import OffersApiService from './api-service/offers-api-service';
import DestinationsModel from './model/destinations-model';
import DestinationsApiService from './api-service/destinations-api-service';


const pageBody = document.querySelector('.page-body');
const mainContainer = pageBody.querySelector('.trip-events');
const pointsContainer = mainContainer.querySelector('.trip-events__list');
const tripMain = pageBody.querySelector('.trip-main');

const points = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const offers = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});

const destinations = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FiltersModel();

const presenter = new Presenter(
  {
    tripsSection: mainContainer,
    pointsUl: pointsContainer,
    destinationsModel: destinations,
    offersModel: offers,
    pointsModel: points,
    filterModel: filterModel,
    tripMain: tripMain,
  }
);


presenter.init();
