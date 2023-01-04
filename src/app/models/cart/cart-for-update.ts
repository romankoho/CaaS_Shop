import {CartItemForUpdate} from "./cart-item-for-update";
import {CouponForCartUpdate} from "../coupon/coupon-for-cart-update";
import {CustomerForCreation} from "../customer/customer-for-creation";

export class CartForUpdate {
  constructor(
    public customer?: CustomerForCreation,
    public items?: CartItemForUpdate[],
    public coupons?: CouponForCartUpdate[],
    public concurrencyToken?: string
  ) {  }
}
