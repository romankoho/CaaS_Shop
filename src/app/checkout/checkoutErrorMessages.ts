export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const CheckoutErrorMessages = [
  new ErrorMessage('firstName', 'required', 'Please enter a first name'),
  new ErrorMessage('lastName', 'required', 'Please enter a last name'),
  new ErrorMessage('email', 'email', 'Please enter a valid email address'),
  new ErrorMessage('email', 'required', 'Please enter a email address'),
  new ErrorMessage('address', 'required', 'Please enter a last address'),
  new ErrorMessage('country', 'required', 'Please enter a last country'),
  new ErrorMessage('state', 'required', 'Please enter a last state'),
  new ErrorMessage('zip', 'required', 'Please enter a last ZIP code'),
  new ErrorMessage('ccName', 'required', 'Please enter the name of the card holder'),
  new ErrorMessage('ccNumber', 'required', 'Please enter a credit card number'),
  new ErrorMessage('ccExpiration', 'required', 'Please enter an expiration date'),
  new ErrorMessage('ccExpiration', 'pattern', 'Please enter a valid expiration date'),
  new ErrorMessage('ccCCV', 'required', 'Please enter a CCV number'),
  new ErrorMessage('ccCCV', 'pattern', 'Please enter a valid CCV number'),
];
