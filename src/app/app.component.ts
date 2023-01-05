import { Component } from '@angular/core';
import {ProductMinimal} from "./models/product/productMinimal";
import {Cart} from "./models/cart/cart";

@Component({
  selector: 'wea5-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'CaaSShop1';

  productsInCart() : number{
    const data = localStorage.getItem('WEA5.cart') || '[]'

    if(data == "[]") {
      return 0
    }

    let cart:Cart = JSON.parse(data)
    let productCount:number = 0;

    if (cart.items == undefined) {
      return 0
    } else {
      for(const item of cart.items) {
        productCount += item.amount
      }
    }

    return productCount
  }
}
