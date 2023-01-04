export class CustomerForCreation {
  constructor(
    public id: string = "",
    public firstName?: string,
    public lastName?: string,
    public eMail?: string,
    public telephoneNumber?: string,
    public creditCardNumber?: string
  ) {  }
}
