export interface Coupon {
    id: string
    shopId: string
    code?: string,
    value: number
    orderId?: string,
    cartId?: string,
    customerId?: string,
    concurrencyToken?: string
}
