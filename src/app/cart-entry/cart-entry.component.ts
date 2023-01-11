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
    this.sum = this.cartItem.amount * this.cartItem.product.price
  }

  public deleteItem(): void {
    this.deleteItemEvent.emit(this.cartItem.product.id)
  }

  public amountHasChanged(): void {
    if(isNaN(this.cartItem.amount) || this.cartItem.amount == undefined || this.cartItem.amount < 1 || this.cartItem.amount > 100) {
      this.invalidAmount = true
      return
    } else {
      this.invalidAmount = false
    }

    let productId = this.cartItem.product.id
    let amount = this.cartItem.amount

    this.amountChanged.emit({productId, amount});
  }

  navigateToProduct() {
    this.router.navigateByUrl(`/products/${this.cartItem.product.id}`)
  }
}
