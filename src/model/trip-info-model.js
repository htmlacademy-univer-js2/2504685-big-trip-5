export default class TripInfoModel {
  #destinations;
  #offers;
  #info;

  constructor({ points, offersModel, destinationsModel }) {
    this.#destinations = destinationsModel.destinations;
    this.#offers = offersModel.offers;
    this.#info = this.#prepareData(points);
  }

  get info() {
    return this.#info;
  }

  #countOffersCost = (curOffers, activeOffers) => {
    let totalCount = 0;
    curOffers.forEach((offer) => {
      if (activeOffers.some((activeOffer) => offer.id === activeOffer)) {
        totalCount += offer.price;
      }
    });
    return totalCount;
  };

  #getTotalCost(points) {
    return points.reduce((total, point) => {
      const currentTypeOffers = this.#offers[point.type];
      return total + point.cost + this.#countOffersCost(currentTypeOffers, point.offers);
    }, 0);
  }

  #prepareData(points) {
    const destinations = [];

    if (points.length >= 1 && points.length <= 3) {
      points.forEach((point) => {
        destinations.unshift(this.#destinations.find(({ id }) => point.destination === id).name);
      });
      return {
        totalCount: this.#getTotalCost(points),
        destinations: destinations,
        isThree: true,
        dateStart: points[0].date.start,
        dateEnd: points[points.length - 1].date.end
      };
    } else if (points.length < 1) {
      return null;
    }

    destinations.unshift(this.#destinations.find(({ id }) => points[0].destination === id).name);
    destinations.unshift(this.#destinations.find(({ id }) => points[points.length - 1].destination === id).name);

    const totalCount = this.#getTotalCost(points);

    return { totalCount, destinations, isThree: false, dateStart: points[points.length - 1].date.start, dateEnd: points[0].date.end };
  }
}
