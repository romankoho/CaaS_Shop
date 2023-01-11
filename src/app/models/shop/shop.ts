import {ShopAdmin} from "./shopAdmin";

export interface Shop{
  id: string,
  name?: string,
  shopAdmin: ShopAdmin,
  cartLifetimeMinutes: number,
  appKey?: string,
  concurrencyToken?: string
}
