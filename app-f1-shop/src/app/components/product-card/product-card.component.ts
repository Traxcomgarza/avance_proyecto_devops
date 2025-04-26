import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

import { CartItem } from '../../models';


@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})

export class ProductCardComponent {

  id = input.required<number>();
  description = input.required<string>();
  img = input.required<string>();
  price = input.required<number>();
  stock = input.required<number>();
  title = input.required<string>();

  cartItem = output<CartItem>();

  quantity = signal<number>(1);

  incrementQuantity(): void {
    if(this.quantity() === this.stock()) return;
    this.quantity.update(value => value + 1);
  }

  decrementQuantity(): void {
    if(this.quantity() === 1) return;
    this.quantity.update(value => value - 1);
  }

  onClickAddToCart() {
    this.cartItem.emit({
      id: this.id(),
      description: this.description(),
      img: this.img(),
      price: this.price(),
      quantity: this.quantity(),
      stock: this.stock(),
      title: this.title(),
    })
  }
}
