import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CartItem, Product } from '../../models';
import { CheckoutStoreService } from '../../services';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private checkoutStore = inject(CheckoutStoreService)

  public products = signal<Product[]>([]);
  public cartItemsAmount = computed(() => this.checkoutStore.cartItems().length)
  
  ngOnInit(): void {
    this.fillProducts();
  }

  fillProducts(): void {
    this.products.set([
      {
        id: '1',
        description: 'Esto es un ejemplo de una descripción del producto muy detallada',
        img: 'https://images.footballfanatics.com/red-bull-racing/red-bull-racing-2025-team-max-verstappen-driver-t-shirt_ss5_p-201493644+u-fkxlj4ojmikgowezcwkm+v-jfg5ebebdhfdijgbduf4.jpg?_hv=2&w=400',
        price: 200,
        stock: 10,
        title: 'Camisa polo de RedBull'
      },
      {
        id: '2',
        description: 'Esto es un ejemplo de una descripción del producto muy detallada',
        img: 'https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-2025-team-t-shirt_ss5_p-202358995+u-9dzx0ffwxs494gsvtivx+v-xzxnreuwod8yigkfboza.jpg?_hv=2',
        price: 230,
        stock: 0,
        title: 'Camisa polo de Ferrari'
      },
      {
        id: '3',
        description: 'Esto es un ejemplo de una descripción del producto muy detallada',
        img: 'https://images.footballfanatics.com/aston-martin/aston-martin-aramco-f1-2024-team-t-shirt_ss5_p-200838287+u-jf4j4xzowo1jytiylihc+v-sfbcoek3htbszhaqcmee.jpg?_hv=2&w=600',
        price: 299,
        stock: 3,
        title: 'Camisa de Aston Martin'
      },
      {
        id: '4',
        description: 'Esto es un ejemplo de una descripción del producto muy detallada',
        img: 'https://images.footballfanatics.com/williams-racing/williams-racing-2022-team-presentation-jacket_ss4_p-12081190+pv-1+u-14ukz3edhi60okmrd8fr+v-e7292fddd90648dda9414dccd7b783ab.jpg?_hv=2&w=900',
        price: 599,
        stock: 0,
        title: 'Chamarra de Williams'
      },
      {
        id: '5',
        description: 'Esto es un ejemplo de una descripción del producto muy detallada',
        img: 'https://www.cmcmotorsports.com/cdn/shop/products/TM1346_PAPAYA_8_57c81eb2-e53d-457b-b8e5-c19d8fc5cca1.jpg?v=1672166639',
        price: 40,
        stock: 1,
        title: 'Playera de McLaren'
      },
    ])
  }

  onClickAddToCart(cartItem: CartItem): void {
    this.checkoutStore.addCartItem(cartItem);
  }
}