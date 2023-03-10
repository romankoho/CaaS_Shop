import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CheckoutErrorMessages} from "./checkoutErrorMessages";
import {BillingAddress} from "../models/order/billingAddress";
import {CustomerForCreation} from "../models/customer/customer-for-creation";
import {v4 as uuidv4} from "uuid";
import {Cart} from "../models/cart/cart";
import {CartService} from "../shared/cart.service";
import {Order} from "../models/order/order";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {CustomerService} from "../shared/customer.service";
import {environment} from "../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'wea5-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  errors: { [key: string]: string } = {};

  cart: Cart = {
    basePrice: 0,
    cartDiscounts: [],
    coupons: [],
    customer: {
      id:"",
      shopId:""
    },
    discountValue: 0,
    id: "",
    items: [],
    lastAccess: "",
    shopId: "",
    totalPrice: 0

  }
  updatedCart: Cart = {
    basePrice: 0,
    cartDiscounts: [],
    coupons: [],
    customer: {
      id:"",
      shopId:""
    },
    discountValue: 0,
    id: "",
    items: [],
    lastAccess: "",
    shopId: "",
    totalPrice: 0
  }

  checkingOut: boolean = false;
  fillInForm: boolean = true;

  order: Order = {
    billingAddress: {}, customerId: "", id: "", orderDate: new Date(), orderNumber: 0, shopId: "", totalPrice: 0
  }

  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private customerService: CustomerService,
              private toast: NgToastService,
              private router: Router,
              private translate: TranslateService) { }

  ngOnInit(): void {
    const data = localStorage.getItem(`${environment.tenantId}.cart`)

    if(data) {
      this.cart = JSON.parse(data)
      this.cartService.getById(this.cart.id).subscribe(res => {
        this.updatedCart = res
        if (this.cart.totalPrice != this.updatedCart.totalPrice) {
          this.toast.warning({detail: "Price was updated", summary:`Old price: ${this.cart.totalPrice} | new price: ${this.updatedCart.totalPrice}`, sticky:true})
        }
      })
    }

    this.initForm()
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      zip: ["", Validators.required],
      telephoneNumber: ["", Validators.required],
      ccName: ["", Validators.required],
      ccNumber: ["", Validators.required],
      ccExpiration:
        ["",
        [Validators.required, Validators.pattern("(0[1-9]|10|11|12)/20[0-9]{2}$")]],
      ccCCV:
        ["",
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
    console.log("form submitted")
    this.checkingOut = true
    this.fillInForm = false

    this.customerService.getByEMail(this.checkoutForm.value.email).subscribe({
      next:(res) => {

        let customer: CustomerForCreation = {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          eMail: res.eMail,
          telephoneNumber: res.telephoneNumber,
          creditCardNumber: this.checkoutForm.value.ccNumber
        }

        this.convertCartToOrder(customer)
      },
      error:(e) => {
        if(e.error.status == 404) {
          let customer: CustomerForCreation = {
            id: uuidv4(),
            firstName: this.checkoutForm.value.firstName,
            lastName: this.checkoutForm.value.lastName,
            eMail: this.checkoutForm.value.email,
            telephoneNumber: this.checkoutForm.value.telephoneNumber,
            creditCardNumber: this.checkoutForm.value.ccNumber
          }
          this.convertCartToOrder(customer)
        }
      }
    })
  }

  private convertCartToOrder(customer: CustomerForCreation) {
    let address: BillingAddress = {
      street: this.checkoutForm.value.address,
      city: this.checkoutForm.value.city,
      country: this.checkoutForm.value.country,
      zipCode: this.checkoutForm.value.zip,
    }

    let orderSuccessfullTransl: string
    this.translate.get('toast.orderSuccessful').subscribe((res: string) => {
      orderSuccessfullTransl = res;
    })

    let orderNumTransl: string
    this.translate.get('toast.orderSuccessful').subscribe((res: string) => {
      orderNumTransl = res;
    })

    let invalidCardTransl: string
    this.translate.get('toast.invalidCard').subscribe((res: string) => {
      invalidCardTransl = res;
    })

    let orderNotPlacedTransl: string
    this.translate.get('toast.orderNotPlaced').subscribe((res: string) => {
      orderNotPlacedTransl = res;
    })

    let inactiveCardTransl: string
    this.translate.get('toast.inactiveCard').subscribe((res: string) => {
      inactiveCardTransl = res;
    })

    let insufficientCreditTransl: string
    this.translate.get('toast.insufficientCredit').subscribe((res: string) => {
      insufficientCreditTransl = res;
    })

    let error: string
    this.translate.get('toast.somethingWentWrong').subscribe((res: string) => {
      error = res;
    })

    this.cartService.convertCartToOrder(this.cart.id, address, customer).subscribe({
      next:(res) => {
        this.order = res;
        this.toast.success({detail: orderSuccessfullTransl, summary:`${this.order.orderNumber} ${orderNumTransl}`, sticky:true})
        localStorage.removeItem(`${environment.tenantId}.cart`)
        this.router.navigateByUrl("/home")

      },
      error: (e) => {
        this.checkingOut = false
        this.fillInForm = true

        switch(e.error.type) {
          case "payment_invalid_card": {
            this.toast.error({detail: invalidCardTransl, summary: orderNotPlacedTransl, duration: 10000})
            break
          }
          case "payment_inactive_card": {
            this.toast.error({detail: inactiveCardTransl, summary:orderNotPlacedTransl, duration: 10000})
            break
          }
          case "payment_insufficient_credit": {
            this.toast.error({detail: insufficientCreditTransl, summary:orderNotPlacedTransl, duration: 10000})
            break
          }
          default: {
            this.toast.error({detail: error, summary:orderNotPlacedTransl, duration: 10000})
            break
          }
        }
      }
    });
  }
}
