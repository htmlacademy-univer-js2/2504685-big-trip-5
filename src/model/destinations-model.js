export default class DestinationsModel {
  #destinationsApiService;
  #destinations = [];

  constructor({ destinationsApiService }) {
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {

    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations;

    } catch(err) {
      throw new Error('');

    }
  }

}

