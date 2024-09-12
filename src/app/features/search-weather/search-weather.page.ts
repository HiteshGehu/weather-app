import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/weather.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.page.html',
  styleUrls: ['./search-weather.page.scss'],
})
export class SearchWeatherPage implements OnInit {
  city: string = 'Dehradun';
  weatherData: any;
  forecast: any;

  constructor(
    private weatherService: WeatherService,
    private loadingCtrl: LoadingController,
    private route: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.searchWeather();
  }

  searchWeather() {
    this.loadingCtrl.create({ message: 'Searching...' }).then((loadingEl) => {
      loadingEl.present();
      if (this.city.trim() !== '') {
        this.weatherService.getWeatherByCity(this.city).subscribe((data) => {
          this.weatherData = data;
          this.forecast = this.weatherData.forecast.forecastday;
          loadingEl.dismiss();
        });
      }
    });
  }

  navigateToHome() {
    this.route.navigate(['/', 'home']);
  }

  logout() {
    this.authService.logout();
  }
}
