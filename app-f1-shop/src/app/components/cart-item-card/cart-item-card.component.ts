import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';

import { CheckoutStoreService } from '../../services';

@Component({
  selector: 'app-cart-item-card',
  imports: [CommonModule],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss'
})

export class CartItemCardComponent {

  private checkoutStore = inject(CheckoutStoreService);

  public description = input.required<string>();
  public id = input.required<string>();
  public img = input.required<string>();
  public price = input.required<number>();
  public quantity = input.required<number>();
  public stock = input.required<number>();
  public title = input.required<string>();

  totalPrice = computed(() => {
    if(this.stock() === 0) return 0;
    return this.price() * this.quantity()
  })

  incrementQuantity(): void {
    if (this.quantity() === this.stock()) return;
    const newQuantity = this.quantity() + 1;
    this.checkoutStore.updateCartItemQuantity(Number(this.id()), newQuantity);
  }

  decrementQuantity(): void {
    if (this.quantity() === 1) return;
    const newQuantity = this.quantity() - 1;
    this.checkoutStore.updateCartItemQuantity(Number(this.id()), newQuantity);
  }

  onDeleteCartItem(cartItemId: string): void {
    this.checkoutStore.deleteCartItem(Number(cartItemId));
  }
}