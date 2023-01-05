import {BillingAddress} from "./billingAddress";
import {CustomerForCreation} from "../customer/customer-for-creation";
import {OrderItem} from "./orderItem";
import {Coupon} from "../coupon/coupon";
import {Discount} from "../discount/discount";

export interface Order {
  id: string,
  shopId: string,
  orderNumber: number,
  customerId: string,
  items?: OrderItem[],
  coupons?: Coupon[],
  orderDiscounts?: Discount[],
  billingAddress: BillingAddress,
  orderDate: Date,
  totalPrice: number,
  concurrencyToken?: string
}
