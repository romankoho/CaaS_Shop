import {ProductForCartItemUpdate} from "../product/product-for-cart-item-update";

export interface CartItemForUpdate {
     product?: ProductForCartItemUpdate,
     amount: number
     concurrencyToken?: string
}
