import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from "../shared/cart.service";
import {CartForUpdate} from "../models/cart/cart-for-update";
import {Cart} from "../models/cart/cart";

@Component({
  selector: 'div.wea5-cart-entry',
  templateUrl: './cart-entry.component.html',
  styles: [
  ]
})
export class CartEntryComponent implements OnInit {

  constructor(private cartService: CartService) { }

  @Input() cartId: string = "";
  @Input() productId: string = "";
  @Input() id: string = "";
  @Input() name?: string;
  @Input() amount: number = 0;
  @Input() price: number = 0;
  @Input() totalItemPrice: number = 0;

  sum: number = 0;
  invalidAmount: boolean = false;

  @Output() amountChanged = new EventEmitter<{productId: string, amount:number}>();
  @Output() deleteItemEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.sum = this.amount * this.price
  }

  public deleteItem(): void {
    this.deleteItemEvent.emit(this.productId)
  }

  public amountHasChanged(): void {
    if(isNaN(this.amount) || this.amount == undefined || this.amount < 1 || this.amount > 100) {
      this.invalidAmount = true
      return
    } else {
      this.invalidAmount = false
    }

    let productId = this.productId
    let amount = this.amount

    this.amountChanged.emit({productId, amount});
  }
}
