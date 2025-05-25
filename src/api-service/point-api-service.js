import ApiService from '../framework/api-service';

const Methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
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
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Methods.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {

    const response = await this._load({
      url: `points/${point.id}`,
      method: Methods.DELETE,
    });

    return response;
  }

  #adaptToServer(point) {

    const adapted = {...point,
      'base_price': Number(point.cost),
      'date_from': point.date.start instanceof Date ? point.date.start.toISOString() : null,
      'date_to': point.date.end instanceof Date ? point.date.end.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    delete adapted.date;
    delete adapted.cost;
    delete adapted.isFavorite;

    return adapted;
  }
}
