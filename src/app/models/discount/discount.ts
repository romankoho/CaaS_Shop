export class Discount {
  constructor(
    public id: string = "",
    public discountName?: string,
    public discountValue: number = 0,
    public shopId: string = "",
    public parentId: string = "",
    public concurrencyToken?: string
  ) {
  }
}
