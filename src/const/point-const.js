const BlancPoint =
{
  type: 'flight',
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: [
  ],
};


const PresenterModes = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortTypes = {
  DEFAULT: 'default',
  BY_PRICE: 'price',
  BY_TIME: 'time',
};


const FilterTypes = {
  ALL: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};


export {FilterTypes, SortTypes, PresenterModes, BlancPoint};
