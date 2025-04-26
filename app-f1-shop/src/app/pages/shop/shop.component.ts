import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartItem, Product } from '../../models';
import { CheckoutStoreService } from '../../services';

import { environment } from '../../../environment';

@Component({
  standalone: true,
  selector: 'app-shop',
  imports: [RouterLink, ProductCardComponent, HttpClientModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  private checkoutStore = inject(CheckoutStoreService);
  private http = inject(HttpClient);

  public products = signal<Product[]>([]);
  public cartItemsAmount = signal<number>(0);

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>(`${environment.apiUrl}/productos`).subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error al obtener productos:', err)
    });
  }

  onClickAddToCart(cartItem: CartItem): void {
    this.checkoutStore.addCartItem(cartItem);
    this.cartItemsAmount.set(this.checkoutStore.cartItems().length);
  }
}
