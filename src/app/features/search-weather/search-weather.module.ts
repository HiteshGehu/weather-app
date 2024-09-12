import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchWeatherPageRoutingModule } from './search-weather-routing.module';

import { SearchWeatherPage } from './search-weather.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchWeatherPageRoutingModule
  ],
  declarations: [SearchWeatherPage]
})
export class SearchWeatherPageModule {}
