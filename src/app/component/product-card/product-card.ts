import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() name!: string;
  @Input() imgUrl!: string;
  @Input() quantity!: number;
  @Input() id!: string;

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/product', this.id]);
  }
}
