export interface Product {
  id: string
  shopId: string
  name?: string
  description?: string,
  downloadLink?: string,
  imageSrc?: string,
  price: number,
  deleted: boolean,
  concurrencyToken: string
}
