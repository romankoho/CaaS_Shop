import {BillingAddress} from "./BillingAddress";
import {CustomerForCreation} from "../customer/customer-for-creation";

export interface OrderForCreation {
  cartId: string,
  billingAddress: BillingAddress,
  customer: CustomerForCreation
}
