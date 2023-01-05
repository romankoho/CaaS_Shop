import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CheckoutErrorMessages} from "./checkoutErrorMessages";
import {BillingAddress} from "../models/order/BillingAddress";
import {CustomerForCreation} from "../models/customer/customer-for-creation";
import {v4 as uuidv4} from "uuid";
import {Cart} from "../models/cart/cart";

@Component({
  selector: 'wea5-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  errors: { [key: string]: string } = {};

  address: BillingAddress = {
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: ""
  }

  customer: CustomerForCreation = {
    id: uuidv4(),
    firstName: "",
    lastName: "",
    eMail: "",
    telephoneNumber: "",
    creditCardNumber: "",
  }

  creditCardHolder = ""
  ccExpiration = ""
  ccCCV = ""

  cart: Cart

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const data = localStorage.getItem('WEA5.cart')

    if(data) {
      this.cart = JSON.parse(data)
    }

    this.initForm()
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      firstName: [this.customer.firstName, Validators.required],
      lastName: [this.customer.lastName, Validators.required],
      email: [this.customer.eMail, [Validators.required, Validators.email]],
      address: [this.address.street, Validators.required],
      country: [this.address.country, Validators.required],
      state: [this.address.state, Validators.required],
      zip: [this.address.zipCode, Validators.required],
      ccName: [this.creditCardHolder, Validators.required],
      ccNumber: [this.customer.creditCardNumber, Validators.required],
      ccExpiration:
        [this.ccExpiration,
        [Validators.required, Validators.pattern("(0[1-9]|10|11|12)/20[0-9]{2}$")]],
      ccCCV:
        [this.ccCCV,
        [Validators.required, Validators.pattern("[0-9]{3}")]]
    });

    this.checkoutForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of CheckoutErrorMessages) {
      const control = this.checkoutForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors != null &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }


  submitForm() {
    console.log("Submit form was clicked")
  }


}
