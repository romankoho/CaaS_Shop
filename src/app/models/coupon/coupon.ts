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

  copy():Coupon{
   let copy = new Coupon();
   copy.id = this.id;
   copy.shopId = this.shopId;
   copy.code = this.code;
   copy.value = this.value;
   copy.orderId = this.orderId;
   copy.cartId = this.cartId;
   copy.customerId = this.customerId;
   copy.concurrencyToken = this.concurrencyToken;
   return copy
  }
}
