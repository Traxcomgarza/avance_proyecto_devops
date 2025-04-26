import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../../models';


@Injectable({
  providedIn: 'root'
})
export class CheckoutStoreService {

  constructor() { }

  public cartItems = signal<CartItem[]>([])

  public totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  });

  public addCartItem(cartItem: CartItem): void {
    this.cartItems.update(items => {
      const index = items.findIndex(el => el.id === cartItem.id);

      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems[index] = { ...items[index], ...cartItem };
        return updatedItems;
      } else {
        return [...items, cartItem];
      }
    });
  }

  public deleteCartItem(cartItemId: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== cartItemId));
  }

  public updateCartItemQuantity(cartItemId: number, newQuantity: number): void {
    this.cartItems.update(items => {
      const index = items.findIndex(item => item.id === cartItemId);
      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: newQuantity
        };
        return updatedItems;
      }
      return items;
    });
  }
}
