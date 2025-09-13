import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Html5Qrcode } from 'html5-qrcode';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../layouts/header/header';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [ReactiveFormsModule, Header],
  templateUrl: './scanner.html',
  styleUrl: './scanner.scss',
})
export class Scanner {
  private html5QrCode!: Html5Qrcode;
  productInfo: ProductType | null = null;
  codeForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.codeForm = this.fb.group({
      barcode: [''],
    });
  }

  startScanner(): void {
    const config = {
      fps: 10,
      qrbox: {
        width: 250,
        height: 250,
      },
    };

    this.html5QrCode = new Html5Qrcode('scanner');
    this.html5QrCode
      .start(
        { facingMode: 'environment' },
        config,
        (decodeText) => {
          console.log('Código escaneado:', decodeText);
          this.fetchProduct(decodeText);
          this.html5QrCode.stop();
        },
        (errorMessage) => {
          console.warn('Error al escanear: ', errorMessage);
        }
      )
      .catch((err) => console.log('Error al iniciar escáner:', err));
  }

  fetchProduct(code: string): Promise<ProductType | null> {
    const isBarcode = /^\d{8,14}$/.test(code);

    if (!isBarcode) {
      this.error = 'El código escaneado no es un código de barras válido.';
      return Promise.resolve(null);
    }

    return fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then((res) => res.json() as Promise<OpenFoodFactsResponse>)
      .then((data) => {
        if (data.status === 1) {
          this.productInfo = data.product;
          console.log('Producto:', data.product);
          return data.product;
        } else {
          this.error = 'Producto no encontrado';
          return null;
        }
      })
      .catch((err) => {
        console.error('Error al hacer la petición:', err);
        return null;
      });
  }
  async searchByCode(): Promise<void> {
    const code: string = (this.codeForm.get('barcode')?.value ?? '').trim();
    if (!code) {
      return;
    }
    const product = await this.fetchProduct(code);
    if (product) {
      this.router.navigate(['/product', code]);
    } else {
      this.error = 'Producto no encontrado';
    }
  }
}
