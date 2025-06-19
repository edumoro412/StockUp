import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layouts/header/header';
import { Scanner } from './scanner/scanner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Scanner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'StockUp';
}
