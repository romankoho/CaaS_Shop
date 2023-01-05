import {CartItemForUpdate} from "./cart-item-for-update";
import {CouponForCartUpdate} from "../coupon/coupon-for-cart-update";
import {CustomerForCreation} from "../customer/customer-for-creation";

export interface CartForUpdate {
   customer?: CustomerForCreation,
   items?: CartItemForUpdate[],
   coupons?: CouponForCartUpdate[],
   concurrencyToken?: string
}
