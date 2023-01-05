import {BillingAddress} from "./billingAddress";
import {CustomerForCreation} from "../customer/customer-for-creation";
import {ProductDetail} from "../product/productDetail";
import {Product} from "../product/product";
import {Discount} from "../discount/discount";

export interface OrderItem {
  id: string,
  product: Product,
  shopId: string,
  orderId: string,
  amount: number,
  orderItemDiscounts?: Discount[],
  pricePerPiece: number,
  totalPrice: number,
  concurrencyToken?: string
}
