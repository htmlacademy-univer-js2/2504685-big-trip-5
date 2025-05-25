const BLANC_TEST =
{
  type: 'bus',
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: [
  ],
  activeOffers:
    0,
  description:'',
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
  INIT: 'INIT',
};

const FilterTypes = {
  ALL: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};


const AUTHORIZATION = 'Basic y16e6n415ya12nsj12jkosad';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';


export {AUTHORIZATION, END_POINT, FilterTypes, UserActions, UpdateTypes ,SortTypes, PresenterModes, MAX_PRICE, MAX_OFFER_ID,PHOTOS_COUNT, DATE_FORMAT_EDIT, DATE_FORMAT_POINT_DAY, DATE_FORMAT_POINT_HOURS, BLANC_TEST, POINTS_COUNT};
