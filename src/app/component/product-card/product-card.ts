import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

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

  constructor(private router: Router, private supabase: SupabaseService) {}

  goToDetails() {
    this.router.navigate(['/product', this.id]);
  }

  async increaseQuantity(product: ProductType) {
    if (product.quantity) {
      product.quantity += 1;
      const userId = await this.supabase.getUserId();
      if (userId) {
        await this.supabase.addToPantry(userId, this.id, 1);
      }
    }
    return;
  }

  async decreaseButton(product: ProductType) {
    if (product.quantity && Number(product.quantity) > 1) {
      await this.supabase.decreaseQuantity(product.code);
    } else if (product.quantity ?? Number(product.quantity) == 1) {
      await this.supabase.deletePantryItem(product.code);
    }
  }
}
