import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { ProductCard } from '../../component/product-card/product-card';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-pantry',
  imports: [ProductCard, ReactiveFormsModule, RouterLink],
  templateUrl: './pantry.html',
  styleUrl: './pantry.scss',
})
export class Pantry implements OnInit {
  data: PantryProductType[] = [];
  filteredData: PantryProductType[] = [];
  searchControl = new FormControl('');
  loading: boolean = false;

  constructor(private supabase: SupabaseService) {}
  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      this.data = await this.supabase.getProductsOfCurrentUser();
      this.filteredData = [...this.data];

      this.searchControl.valueChanges
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((query) => {
          this.filteredData = this.data.filter((p) =>
            p.product_name
              .toLowerCase()
              .includes(query?.toLocaleLowerCase() || '')
          );
        });
    } catch (err) {
      console.log('Hubo un error al cargar la despensa', err);
    } finally {
      this.loading = false;
    }
  }

  async increaseQuantity(product: PantryProductType) {
    product.isLoading = true;
    if (product.quantity) {
      product.quantity += 1;
      const userId = await this.supabase.getUserId();
      if (userId) {
        await this.supabase.addToPantry(userId, product.product_id, 1);
        product.isLoading = false;
      }
    }
    return;
  }

  async decreaseButton(product: PantryProductType) {
    product.isLoading = true;
    if (product.quantity && Number(product.quantity) > 1) {
      await this.supabase.decreaseQuantity(product.product_id);
      product.quantity -= 1;
    } else if (product.quantity ?? Number(product.quantity) == 1) {
      await this.supabase.deletePantryItem(product.product_id);
      this.data = this.data.filter((p) => p.product_id !== product.product_id);
    }
    product.isLoading = false;
  }
}
