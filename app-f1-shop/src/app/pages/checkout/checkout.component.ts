import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'; 


import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CheckoutStoreService } from '../../services';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../../environment';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, CartItemCardComponent, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private checkoutStore = inject(CheckoutStoreService);
  private httpClient  = inject(HttpClient);
  private router = inject(Router);

  public cartItems = computed(() => [...this.checkoutStore.cartItems()]);
  public cartItemsAmount = computed(() => this.checkoutStore.cartItems().length);
  public totalPrice = computed(() => this.checkoutStore.totalPrice());

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  public onCheckout(): void {
    const cartItems = this.checkoutStore.cartItems();
    console.log('Datos de la compra:', cartItems);


    cartItems.forEach(item => {
      this.httpClient.post(`${environment.apiUrl}/productos/comprar`, {
        id: item.id,
        cantidad: item.quantity
      }).subscribe({
        next: (response) => {
          console.log('Compra realizada con éxito', response);

        },
        error: (error) => {
          console.error('Error al realizar la compra', error);
        }
      });
    });
    // Vaciar el carrito después de la compra
    this.checkoutStore.clearCart();

    // Redirigir al usuario a la tienda después de que todos los productos hayan sido procesados
    this.router.navigate(['/shop']);
  }

}
