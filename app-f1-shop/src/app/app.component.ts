import { Component } from '@angular/core';
import { CheckoutStoreService } from './services/checkout-store/checkout-store.service';  // Importa el servicio
import { CartItem } from './models';  // Importa tu modelo de CartItem
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports : [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-f1-shop';
  cartItems: CartItem[] = [];  // Variable para almacenar productos del carrito

  // Inyecta CheckoutStoreService
  constructor(private checkoutStoreService: CheckoutStoreService) {}

  ngOnInit(): void {
    // Obtiene los productos del carrito al iniciar
    this.cartItems = this.checkoutStoreService.cartItems();
  }

  // Función para realizar la compra
  public checkout(): void {
    if (this.cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    this.checkoutStoreService.checkout(this.cartItems).subscribe(
      response => {
        console.log('Compra realizada con éxito', response);
        this.checkoutStoreService.cartItems.update(() => []);  // Limpia el carrito después de la compra
      },
      error => {
        console.error('Error en la compra', error);
        alert('Hubo un error al procesar tu compra');
      }
    );
  }
}
