export default class OffersModel {
  #offersApiService;
  #offers = [];

  constructor({ offersApiService }) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const offers = await this.#offersApiService.offers;
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

