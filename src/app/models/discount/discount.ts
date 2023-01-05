export interface Discount {
   id: string
   discountName?: string
   discountValue: number
   shopId: string
   parentId: string
   concurrencyToken?: string
}
