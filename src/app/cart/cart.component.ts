import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import {Cart} from "../models/cart/cart";
import {CartService} from "../shared/cart.service";
import {CartItemForUpdate} from "../models/cart/cart-item-for-update";
import {Coupon} from "../models/coupon/coupon";

@Component({
  selector: 'wea5-cart',
  templateUrl: './cart.component.html',
  styles: [

  ]
})
export class CartComponent implements OnInit {

  cart: Cart = new Cart()

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    const data = localStorage.getItem('WEA5.cartId') || '[]'
    const cartId = JSON.parse(data)

    this.cartService.getById('A98CF8AF-1A89-4282-B6DB-ACB2A7410EF5').subscribe(res => this.cart = res)

    /*
    if(data !== '') {
      this.cartService.getById('A98CF8AF-1A89-4282-B6DB-ACB2A7410EF5').subscribe(res => this.cart = res)
    } else {
      console.log("no cart Id in localStorage found")
    }
    */

  }


  checkout() {
    console.log("checkout was pressed")
  }

  public getItemsCount(): number {
    console.log("getItemsCount called")

    let productCount:number = 0;

    if (this.cart.items == undefined) {
      return 0
    } else {
      for(const item of this.cart.items) {
        productCount += item.amount
      }
    }

    return productCount
  }


  amountChanged(productId:string, amount:number) {
    let updatedItem:CartItemForUpdate | undefined = this.cart.items!.find(element => element.product?.id == productId)

    if(updatedItem != undefined) {
      updatedItem.amount = amount
    }

    this.cartService.updateCart(this.cart.id, this.cart).subscribe(res => this.cart = res)
  }

  removeItem($event: string) {
    this.cart.items = this.cart.items!.filter(element => element.product?.id != $event)
    this.cartService.updateCart(this.cart.id, this.cart).subscribe(res => this.cart = res)
  }

  removeCoupon(code: string | undefined) {
    this.cart.coupons = this.cart.coupons!.filter(element => element.code != code)
    this.cartService.updateCart(this.cart.id, this.cart).subscribe(res => this.cart = res)
  }

  applyCoupon(code: string) {
    let newCoupon = new Coupon(code)
    this.cart.coupons?.push(newCoupon)
    this.cartService.updateCart(this.cart.id, this.cart).subscribe(res => this.cart = res)
  }
}
