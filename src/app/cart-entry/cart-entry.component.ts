import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from "../shared/cart.service";
import {Router} from "@angular/router";
import {CartItem} from "../models/cart/cart-item";

@Component({
  selector: 'div.wea5-cart-entry',
  templateUrl: './cart-entry.component.html',
  styles: [
  ]
})
export class CartEntryComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) { }

  @Input() cartId: string = "";
  @Input() cartItem: CartItem

  sum: number = 0;
  invalidAmount: boolean = false;

  @Output() amountChanged = new EventEmitter<{productId: string, amount:number}>();
  @Output() deleteItemEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.sum = Math.round(((this.cartItem.amount * this.cartItem.product.price) + Number.EPSILON) * 100 )/100
  }

  public deleteItem(): void {
    this.deleteItemEvent.emit(this.cartItem.product.id)
  }

  public amountHasChanged(): void {

    if(isNaN(this.cartItem.amount) || this.cartItem.amount == undefined || this.cartItem.amount < 1 || this.cartItem.amount > 100) {
      this.invalidAmount = true
      this.amountChanged.emit({productId: this.cartItem.product.id, amount: 0});
    } else {
      this.invalidAmount = false
      this.amountChanged.emit({productId: this.cartItem.product.id, amount: this.cartItem.amount});
    }
  }

  navigateToProduct() {
    this.router.navigateByUrl(`/products/${this.cartItem.product.id}`)
  }
}
