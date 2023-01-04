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

  public copy():CartItem {
    let copyItem = new CartItem()
    copyItem.id = this.id;
    copyItem.product = this.product.copy();
    copyItem.shopId = this.shopId;
    copyItem.cartId = this.cartId;
    copyItem.amount = this.amount;

    if(this.cartItemDiscounts != undefined) {
      for(let i of this.cartItemDiscounts) {
        copyItem.cartItemDiscounts?.push(i.copy())
      }
    }

    copyItem.totalPrice = this.totalPrice;
    copyItem.concurrencyToken = this.concurrencyToken
    return copyItem
  }
}
