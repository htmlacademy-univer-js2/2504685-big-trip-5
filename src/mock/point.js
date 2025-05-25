
const Offers = {
  0:[
    {
      text:'test',
      cost:228,
      name:'event-offer-test',
      checked: false,
    }
  ],
  1: [
    {
      text: 'Rent a car',
      cost: 80,
      name: 'event-offer-rent',
      checked: false,
    }
  ],
  2:[
    {
      text: 'Add luggage',
      cost: 50,
      name: 'event-offer-luggage',
      checked: false,
    },
    {
      text:'Switch to comfort',
      cost: 80,
      name: 'event-offer-comfort',
      checked: false,
    },
  ],
  3:[
    {
      text:'Add breakfast',
      cost: 50,
      name: 'event-offer-breakfast',
      checked: false,
    },
  ],
};

const getOffersId = (type) => {
  switch(type.toLowerCase()){
    case ('drive'):{
      return 1;
    }
    case ('flight'):{
      return 2;
    }
    case ('check-in'):{
      return 3;
    }
    default: {
      return 0;
    }
  }
};


export {Offers, getOffersId};
