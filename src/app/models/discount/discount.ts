export class Discount {
  constructor(
    public id: string = "",
    public discountName?: string,
    public discountValue: number = 0,
    public shopId: string = "",
    public parentId: string = "",
    public concurrencyToken?: string
  ) { }

  copy(): Discount{
    let discountCopy = new Discount();
    discountCopy.id = this.id;
    discountCopy.discountName = this.discountName;
    discountCopy.discountValue = this.discountValue;
    discountCopy.shopId = this.shopId;
    discountCopy.parentId = this.parentId;
    discountCopy.concurrencyToken = this.concurrencyToken;
    return discountCopy
  }
}
