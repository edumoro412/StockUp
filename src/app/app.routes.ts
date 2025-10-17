import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Scanner } from './Pages/scanner/scanner';
import { LogIn } from './Pages/log-in/log-in';
import { Register } from './Pages/register/register';
import { authGuard } from './auth-guard';
import { Product } from './product/product';
import { User } from './user/user';
import { Pantry } from './Pages/pantry/pantry';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Favorites } from './Pages/favorites/favorites';
import { Footer } from './layouts/footer/footer';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      { path: 'scanner', component: Scanner },
      { path: 'product/:id', component: Product },
      { path: 'user', component: User },
      { path: 'pantry', component: Pantry },
      { path: 'favorites', component: Favorites },
    ],
  },
  {
    path: 'login',
    component: LogIn,
  },
  {
    path: 'register',
    component: Register,
  },
];
