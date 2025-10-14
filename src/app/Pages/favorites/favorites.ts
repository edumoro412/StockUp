import { Component } from '@angular/core';
import { FavoritesCard } from '../../component/favorites-card/favorites-card';

@Component({
  selector: 'app-favorites',
  imports: [FavoritesCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {}
