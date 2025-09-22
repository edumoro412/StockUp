import { Component } from '@angular/core';
import { Header } from '../layouts/header/header';
import { ActivatedRoute } from '@angular/router';
import { KJtoCal } from '../services/pipe';
import { SupabaseService } from '../services/supabase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [Header, KJtoCal, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  productInfo: ProductType | null = null;
  loading: boolean = false;
  showModal: boolean = false;
  quantity: number = 1;
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private supabase: SupabaseService
  ) {}
  async ngOnInit(): Promise<void> {
    this.loading = true;
    try {
      const code = this.route.snapshot.paramMap.get('id');
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${code}.json`
      );
      const data = await response.json();
      if (data.status === 1) {
        this.productInfo = data.product;
      } else {
        this.productInfo = null;
      }
    } catch (err) {
      console.error('Error al cargar el producto', err);
    } finally {
      this.loading = false;
    }
  }

  async addToPantry(): Promise<void> {
    try {
      this.isLoading = true;
      const userId = await this.supabase.getUserId();
      if (!userId) {
        console.log('No se ha obtenido el id del usuario en el addTuPantry()');
        return;
      }
      const code = this.route.snapshot.paramMap.get('id');
      if (!code) {
        console.log('No se ha obtenido el código en addToPantry');
        return;
      }

      await this.supabase.addToPantry(userId, code, this.quantity);

      this.closeModal();
    } catch (e) {
      console.log('erroe en el addTiPantry', e);
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.showModal = false;
  }
  openModal() {
    this.showModal = true;
  }
}
