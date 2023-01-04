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
}
