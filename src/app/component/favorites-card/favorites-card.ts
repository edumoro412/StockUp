import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-favorites-card',
  imports: [],
  templateUrl: './favorites-card.html',
  styleUrl: './favorites-card.scss',
})
export class FavoritesCard {
  @Input() data!: FavoritesProductType[] | null;
  @Output() navigate = new EventEmitter();

  goDetails(id: string) {
    this.navigate.emit(id);
  }
}
