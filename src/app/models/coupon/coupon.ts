export class Coupon {
  constructor(
    public id: string = "",
    public shopId: string = "",
    public code?: string,
    public value: number = -1,
    public orderId?: string,
    public cartId?: string,
    public customerId?: string,
    public concurrencyToken?: string
  ) {  }
}
