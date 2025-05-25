import { Offers, getOffersId } from './mock/offers';

const pointTypes = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const dates = [
  {
    start: new Date(Date.UTC(2024, 8, 25, 11, 14, 0, 0)),
    end: new Date(Date.UTC(2024, 8, 25, 14, 0, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 5, 25, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 5, 25, 12, 2, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 5, 11, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 5, 25, 12, 2, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 0, 25, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 0, 25, 12, 2, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 4, 10, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 4, 20, 12, 2, 0, 0))
  },
];


const destinations = [
  'Ulan-Ude',
  'Amsterdam',
  'Prague',
  'Luxembourg',
];

const BLANC_TEST =
{
  type: 'Bus',
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: {
    id: 0
  },
  activeOffers:
    Offers[getOffersId('default')],
  desctiption:'',
  photosSrc: ['https://loremflickr.com/248/152?random=$0)']
};


const DATE_FORMAT_EDIT = 'DD/MM/YY hh:mm';
const DATE_FORMAT_POINT_DAY = 'MMM DD';
const DATE_FORMAT_POINT_HOURS = 'hh-mm';

const PHOTOS_COUNT = 20;
const MAX_PRICE = 2000;
const MAX_OFFER_ID = 5;
const POINTS_COUNT = 4;

const PresenterModes = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortTypes = {
  DEFAULT: 'default',
  BY_PRICE: 'price',
  BY_TIME: 'time',
  BY_OFFERS: 'offers',
  BY_NAME: 'name',
};

const UserActions = {
  UPDATE_POINT: 'update',
  ADD_POINT: 'add',
  DELETE_POINT: 'delete',
};


const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterTypes = {
  ALL: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};


export { FilterTypes, UserActions, UpdateTypes, dates ,SortTypes, PresenterModes, MAX_PRICE, MAX_OFFER_ID,PHOTOS_COUNT,destinations, pointTypes, DATE_FORMAT_EDIT, DATE_FORMAT_POINT_DAY, DATE_FORMAT_POINT_HOURS, BLANC_TEST, POINTS_COUNT};
