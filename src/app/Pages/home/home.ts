import { Component } from '@angular/core';
import { Header } from '../../layouts/header/header';

@Component({
  selector: 'app-home',
  imports: [Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
