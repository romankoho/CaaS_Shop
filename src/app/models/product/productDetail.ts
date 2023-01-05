export class ProductDetail {
  constructor(
    public id: string = "",
    public shopId: string = "",
    public name?: string,
    public description?: string,
    public imageSrc?: string,
    public price: number = 0
  ){ }
}
