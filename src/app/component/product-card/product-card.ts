import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: PantryProductType;
  @Output() increase = new EventEmitter<PantryProductType>();
  @Output() decrease = new EventEmitter<PantryProductType>();

  disableButton: boolean = false;

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/product', this.product.product_id]);
  }

  onIncreaseClick(event: Event) {
    try {
      this.disableButton = true;
      event.stopPropagation();
      this.increase.emit(this.product);
    } catch (err) {
      console.log(err);
    } finally {
      this.disableButton = false;
    }
  }

  onDecreaseClick(event: Event) {
    try {
      this.disableButton = true;
      event.stopPropagation();
      this.decrease.emit(this.product);
    } catch (err) {
      console.log(err);
    } finally {
      this.disableButton = false;
    }
  }
}
