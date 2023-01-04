export class ProductMinimal {
  constructor(
    public id: string = "",
    public shopId: string = "",
    public name?: string,
    public imageSrc?: string,
    public price: number = 0
  ) {
  }
}
