import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../shared/weather.service';
import { LoadingController } from '@ionic/angular';
import { IFav } from './fav.model';
import { IonModal } from '@ionic/angular';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favWeather: IFav[] = [];
  favForm!: FormGroup;
  isWeatherModalOpen = false;
  isAddFavModalOpen = false;
  editingFav: IFav | null = null;
  weatherData: any;
  forecast: any;
  locationPresent = true;

  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
  ) {
    this.favForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllFav();
  }

  getAllFav() {
    this.loadingCtrl
      .create({ message: 'Fetching your favourite place...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.weatherService
          .getAllFav()
          .snapshotChanges()
          .subscribe({
            next: (data) => {
              this.favWeather = [];
              data.forEach((item) => {
                let location = item.payload.toJSON() as IFav;
                this.favWeather.push({
                  key: item.key || '',
                  title: location.title,
                  description: location.description,
                  showFullDescription: false,
                });
              });
              loadingEl.dismiss();
              if (this.favWeather.length == 0) {
                this.locationPresent = false;
              }
            },
          });
      });
  }

  toggleDescription(fav: any) {
    fav.showFullDescription = !fav.showFullDescription;
  }

  // Add new favourite or update existing
  submitFavForm() {
    if (this.editingFav) {
      // Update existing favourite
      this.weatherService
        .updateFav(this.editingFav.key, this.favForm.value)
        .then(() => {
          this.getAllFav();
          this.closeAddFavModal();
        });
    } else {
      // Add new favourite
      this.weatherService.addFav(this.favForm.value);
      this.getAllFav();
      this.closeAddFavModal();
    }
  }

  // Open modal to add a favourite
  openAddFavModal() {
    this.favForm.reset();
    this.editingFav = null;
    this.isAddFavModalOpen = true;
  }

  // Close modal
  closeAddFavModal() {
    this.isAddFavModalOpen = false;
  }

  // Open modal to edit a favourite
  editFav(fav: IFav) {
    this.editingFav = fav;
    this.favForm.patchValue(fav);
    this.isAddFavModalOpen = true;
  }

  // Delete favourite
  deleteFav(key: string) {
    this.weatherService.deleteFav(key).then(() => {
      this.getAllFav();
    });
  }

  viewWeatherDetails(location: string) {
    this.loadingCtrl.create({ message: 'Searching...' }).then((loadingEl) => {
      loadingEl.present();
      if (location.trim() !== '') {
        this.weatherService.getWeatherByCity(location).subscribe((data) => {
          this.weatherData = data;
          this.forecast = this.weatherData.forecast.forecastday;
          loadingEl.dismiss();
          this.isWeatherModalOpen = true; // Open the modal
        });
      }
    });
  }

  closeWeatherModal() {
    this.isWeatherModalOpen = false;
  }

  logout() {
    this.authService.logout();
  }
}
