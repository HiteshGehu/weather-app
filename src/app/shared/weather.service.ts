import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { IFav } from '../features/favourites/fav.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiKey = 'a214c2e1726d49bf865104323241007';
  private dbPath = '/favourites';
  favRef!: AngularFireList<any>;
  forecastData: any;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
  ) {
    this.favRef = db.list(this.dbPath);
  }

  getAllFav() {
    return this.favRef;
  }

  getFav(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addFav(favLocation: IFav) {
    this.favRef.push(favLocation);
  }

  updateFav(key: string, favLocation: IFav) {
    return this.favRef.update(key, favLocation);
  }

  deleteFav(key: string) {
    return this.favRef.remove(key);
  }

  getWeatherByCoordinates(lat: number, lon: number) {
    let apiUrl = 'http://api.weatherapi.com/v1/forecast.json?days=5';
    return this.http.get(`${apiUrl}&q=${lat},${lon}&key=${this.apiKey}`);
  }

  getWeatherByCity(cityName: string) {
    let apiUrl = 'http://api.weatherapi.com/v1/forecast.json?days=5';
    return this.http.get(`${apiUrl}&q=${cityName}&key=${this.apiKey}`);
  }
}
