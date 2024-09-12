import { Component } from '@angular/core';
import { WeatherService } from '../../shared/weather.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private route: Router,
    private authService: AuthService,
  ) {}

  navigateToSearch() {
    this.route.navigate(['/', 'search-weather']);
  }

  logout() {
    this.authService.logout();
  }
}
