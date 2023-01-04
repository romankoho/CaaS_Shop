import {Discount} from "../discount/discount";
import {ProductMinimal} from "../product/productMinimal";

export class CartItem {
  constructor(
    public id: string = "",
    public product: ProductMinimal = new ProductMinimal(),
    public shopId: string = "",
    public cartId: string = "",
    public amount: number = 0,
    public cartItemDiscounts?: Discount[],
    public totalPrice: number = 0,
    public concurrencyToken?: string
  ) {  }
}
