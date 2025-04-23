import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CheckoutStoreService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, CartItemCardComponent, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private checkoutStore = inject(CheckoutStoreService);

  public cartItems = computed(() => [...this.checkoutStore.cartItems()]);
  public cartItemsAmount = computed(() => this.checkoutStore.cartItems().length);
  public totalPrice = computed(() => this.checkoutStore.totalPrice());
}