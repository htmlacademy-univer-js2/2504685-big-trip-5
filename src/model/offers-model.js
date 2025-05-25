export default class OffersModel {
  #pointsApiService;
  #offers = [];

  constructor({ offersApiService }) {
    this.#pointsApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = this.#adaptToClientOffers(offers);
    } catch(err) {
      this.#offers = [];
    }
  }

  #adaptToClientOffers(offers) {
    const adapted = offers.reduce((acc, { type, offers: itemOffers }) => {
      acc[type] = itemOffers;
      return acc;
    }, {});
    return adapted;
  }
}

