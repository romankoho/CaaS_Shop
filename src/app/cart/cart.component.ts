import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import {Cart} from "../models/cart/cart";
import {CartService} from "../shared/cart.service";
import {CartItemForUpdate} from "../models/cart/cart-item-for-update";
import {Coupon} from "../models/coupon/coupon";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {CouponForCartUpdate} from "../models/coupon/coupon-for-cart-update";

@Component({
  selector: 'wea5-cart',
  templateUrl: './cart.component.html',
  styles: [

  ]
})
export class CartComponent implements OnInit {

  cart: Cart

  constructor(private cartService: CartService,
              private router: Router,
              private toast: NgToastService) { }

  ngOnInit(): void {
    const data = localStorage.getItem('WEA5.cart')

    if(data) {
      this.cart = JSON.parse(data)
    } else {
      this.cart = {
        basePrice: 0,
        cartDiscounts: [],
        concurrencyToken: "",
        coupons: [],
        customer: {
          id: "",
          shopId: ""
        },
        discountValue: 0,
        id: "",
        items: [],
        lastAccess: "",
        shopId: "",
        totalPrice: 0

      }
    }
  }

  public getItemsCount(): number {
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

    this.cartService.updateCart(this.cart.id, this.cart).subscribe((res) => {
      this.cart = res
      localStorage.setItem('WEA5.cart', JSON.stringify(this.cart));
    })
  }

  removeItem($event: string) {
    this.cart.items = this.cart.items!.filter(element => element.product?.id != $event)
    this.cartService.updateCart(this.cart.id, this.cart).subscribe((res) => {
      this.cart = res
      localStorage.setItem('WEA5.cart', JSON.stringify(this.cart));
    })
  }

  removeCoupon(code: string | undefined) {
    this.cart.coupons = this.cart.coupons!.filter(element => element.code != code)
    this.cartService.updateCart(this.cart.id, this.cart).subscribe((res) => {
      this.cart = res
      localStorage.setItem('WEA5.cart', JSON.stringify(this.cart));
    })
  }

  applyCoupon(code: string) {
    let copyCart:Cart = {
      ...this.cart,
      coupons: [
        ...this.cart.coupons,
        { code: code } as Coupon
      ]
    }

    this.cartService.updateCart(this.cart.id, copyCart).subscribe({
      next:(res) => {
        this.cart = res;
        localStorage.setItem('WEA5.cart', JSON.stringify(this.cart))
        this.cart = res
      },
      error: (e) => {
        this.toast.error({detail: "Ooops something went wrong", summary:"Coupon cannot be added", duration: 5000})
      }
    });
  }

  navigateToCheckout() {
    if(this.getItemsCount() > 0) {
      this.router.navigateByUrl("/checkout");
    }
  }
}
