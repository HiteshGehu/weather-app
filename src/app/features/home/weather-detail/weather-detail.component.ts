import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WeatherService } from 'src/app/shared/weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
})
export class WeatherDetailComponent implements OnInit {
  weatherData: any;
  forecast: any;
  latitude: any;
  longitude: any;
  dataPresent = false;

  constructor(
    private weatherService: WeatherService,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentWeather() {
    this.loadingCtrl
      .create({ message: 'Loading your weather details...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.weatherService
          .getWeatherByCoordinates(this.latitude, this.longitude)
          .subscribe((data) => {
            this.weatherData = data;
            loadingEl.dismiss();
            this.forecast = this.weatherData.forecast.forecastday;
            this.dataPresent = true;
          });
      });
  }

  getCurrentLocation() {
    this.loadingCtrl
      .create({ message: 'Loading your city details...' })
      .then((loadingEl) => {
        loadingEl.present();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              loadingEl.dismiss();
              this.getCurrentWeather();
            },
            (error) => {
              console.error('Error:', error);
            },
          );
        }
      });
  }
}
