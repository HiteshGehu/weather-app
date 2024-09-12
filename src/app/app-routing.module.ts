import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import authGuard from 'src/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomePageModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/authentication/login/login.module').then(
        (m) => m.LoginPageModule,
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'search-weather',
    loadChildren: () =>
      import('./features/search-weather/search-weather.module').then(
        (m) => m.SearchWeatherPageModule,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/authentication/login/login.module').then(
        (m) => m.LoginPageModule,
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/authentication/register/register.module').then(
        (m) => m.RegisterPageModule,
      ),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./features/authentication/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule,
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import(
        './features/authentication/forgot-password/forgot-password.module'
      ).then((m) => m.ForgotPasswordPageModule),
  },
  {
    path: 'favourites',
    loadChildren: () =>
      import('./features/favourites/favourites.module').then(
        (m) => m.FavouritesPageModule,
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
