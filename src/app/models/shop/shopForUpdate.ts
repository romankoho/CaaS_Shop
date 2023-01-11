import {ShopAdminForUpdate} from "./shopAdminForUpdate";

export interface ShopForUpdate{
  name?: string,
  cartLifetimeMinutes: number,
  shopAdmin: ShopAdminForUpdate,
  appKey?: string,
  concurrencyToken?: string
}
