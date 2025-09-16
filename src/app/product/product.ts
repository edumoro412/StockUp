import { Component } from '@angular/core';
import { Header } from '../layouts/header/header';
import { ActivatedRoute } from '@angular/router';
import { KJtoCal } from '../services/pipe';

@Component({
  selector: 'app-product',
  imports: [Header, KJtoCal],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  productInfo: ProductType | null = null;
  loading = false;
  constructor(private route: ActivatedRoute) {}
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
        console.log('====================');
        console.log(this.productInfo);
        console.log(this.productInfo?.product_name);
        console.log(this.productInfo?.nutrition_grades);
        console.log(this.productInfo?.nutriments.carbohydrates);
        console.log(this.productInfo?.nutriments.fat);
        console.log(this.productInfo?.product_name);
        console.log(this.productInfo?.product_name);
      } else {
        this.productInfo = null;
      }
    } catch (err) {
      console.error('Error al cargar el producto', err);
    } finally {
      this.loading = false;
    }
  }
}
