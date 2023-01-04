export class Customer {
  constructor(
    public id: string = "",
    public shopId: string = "",
    public firstName?: string,
    public lastName?: string,
    public eMail?: string,
    public telephoneNumber?: string,
    public concurrencyToken?: string
  ) {  }
}
