import { Component } from '@angular/core';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [Header, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
