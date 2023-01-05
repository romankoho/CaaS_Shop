import {Discount} from "../discount/discount";
import {ProductMinimal} from "../product/productMinimal";

export interface CartItem {
  id: string
  product: ProductMinimal
  shopId: string
  cartId: string
  amount: number
  cartItemDiscounts?: Discount[],
  totalPrice: number
  concurrencyToken?: string
}
