import {Customer} from "../customer/customer";
import {CartItem} from "./cart-item";
import {Coupon} from "../coupon/coupon";
import {Discount} from "../discount/discount";

export class Cart {
  constructor(
    public id: string = "",
    public shopId: string = "",
    public customer: Customer = new Customer(),
    public items: CartItem[] = [],
    public coupons: Coupon[] = [],
    public cartDiscounts: Discount[] = [],
    public lastAccess: string = "",
    public basePrice: number = 0,
    public discountValue: number = 0,
    public totalPrice: number = 0,
    public concurrencyToken?: string
  ) {  }

  copy():Cart{
    let cartCopy = new Cart();
    cartCopy.id = this.id;
    cartCopy.shopId = this.shopId;

    cartCopy.customer = this.customer.copy()

    for(let i of this.items) {
      cartCopy.items.push(i.copy())
    }

    for(let i of this.coupons) {
      cartCopy.coupons.push(i.copy())
    }

    for(let i of this.cartDiscounts) {
      cartCopy.cartDiscounts.push(i.copy())
    }

    cartCopy.lastAccess = this.lastAccess
    cartCopy.basePrice = this.basePrice
    cartCopy.discountValue = this.discountValue
    cartCopy.totalPrice = this.totalPrice
    cartCopy.concurrencyToken = this.concurrencyToken
    return cartCopy
  }
}
