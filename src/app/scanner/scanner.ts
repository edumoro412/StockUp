import { Component, OnInit, OnDestroy } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [],
  templateUrl: './scanner.html',
  styleUrl: './scanner.scss',
})
export class Scanner {
  private html5QrCode!: Html5Qrcode;

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

  fetchProduct(code: string): void {
    const isBarcode = /^\d{8,14}$/.test(code);

    if (!isBarcode) {
      console.warn('No es un código de barras válido');
      return;
    }

    fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          console.log('Producto:', data.product);
        } else {
          console.warn('Producto no encontrado');
        }
      })
      .catch((err) => {
        console.error('Error al hacer la petición:', err);
      });
  }
}
