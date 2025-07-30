import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Scanner } from './scanner/scanner';
import { LogIn } from './Pages/log-in/log-in';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'scanner',
    component: Scanner,
  },
  {
    path: 'login',
    component: LogIn,
  },
];
