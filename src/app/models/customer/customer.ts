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

  copy():Customer {
    let copy = new Customer()
    copy.id = this.id;
    copy.shopId = this.shopId;
    copy.firstName = this.firstName;
    copy.lastName = this.lastName;
    copy.eMail = this.eMail;
    copy.telephoneNumber = this.telephoneNumber;
    copy.concurrencyToken = this.concurrencyToken;
    return copy
  }

}
