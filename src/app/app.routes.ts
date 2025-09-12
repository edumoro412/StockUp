import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Scanner } from './scanner/scanner';
import { LogIn } from './Pages/log-in/log-in';
import { Register } from './Pages/register/register';
import { authGuard } from './auth-guard';
import { Product } from './product/product';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'scanner',
    component: Scanner,
  },
  {
    path: 'login',
    component: LogIn,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'product/:id',
    component: Product,
  },
];
