import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Scanner } from './scanner/scanner';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'scanner',
    component: Scanner,
  },
];
