import {ProductForCartItemUpdate} from "../product/product-for-cart-item-update";

export class CartItemForUpdate {
  constructor(
    public product?: ProductForCartItemUpdate,
    public amount: number = 0,
    public concurrencyToken?: string
  ) {  }
}
