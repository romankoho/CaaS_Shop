import {Customer} from "../customer/customer";
import {CartItem} from "./cart-item";
import {Coupon} from "../coupon/coupon";
import {Discount} from "../discount/discount";

export interface Cart {
  id: string
  shopId: string
  customer: Customer
  items: CartItem[]
  coupons: Coupon[]
  cartDiscounts: Discount[]
  lastAccess: string
  basePrice: number
  discountValue: number
  totalPrice: number
  concurrencyToken?: string
}
