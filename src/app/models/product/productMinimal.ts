export class ProductMinimal {
  constructor(
    public id: string = "",
    public shopId: string = "",
    public name?: string,
    public imageSrc?: string,
    public price: number = 0
  ) {  }

  copy():ProductMinimal{
    let copy = new ProductMinimal()
    copy.id = this.id;
    copy.shopId = this.shopId;
    copy.name = this.name;
    copy.imageSrc = this.imageSrc;
    copy.price = this.price;
    return copy
  }
}
