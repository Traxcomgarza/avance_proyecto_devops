import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutStoreService {

  private apiUrl = environment.apiUrl + '/productos';

  constructor(private http: HttpClient) { }

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
  // Método para realizar la compra
  public checkout(cartItems: CartItem[]): Observable<any> {
    // Creamos un array con los datos que necesitamos para la compra
    const compra = cartItems.map(item => ({
      id: item.id,
      cantidad: item.quantity
    }));

    // Enviamos la solicitud POST para procesar la compra
    return this.http.post(this.apiUrl, compra);
  }
}


