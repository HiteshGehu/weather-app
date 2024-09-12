import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchWeatherPage } from './search-weather.page';

const routes: Routes = [
  {
    path: '',
    component: SearchWeatherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchWeatherPageRoutingModule {}
