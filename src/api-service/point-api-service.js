import ApiService from '../framework/api-service';

const Methods = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {

  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get offers(){
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Methods.PUT,
      body: JSON.stringify(this.#adaptToCServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToCServer(point) {
    const adapted = {...point,
      'base_price': point.cost,
      'date_from': point.date.start,
      'date_to': point.date.end,
      'is_favorite': point.isFavorite,
    };

    delete adapted.date;
    delete adapted.cost;
    delete adapted.isFavorite;
    delete adapted.activeOffers;

    return adapted;
  }
}
