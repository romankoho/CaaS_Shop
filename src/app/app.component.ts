import {Component, OnInit} from '@angular/core';
import {ProductMinimal} from "./models/product/productMinimal";
import {Cart} from "./models/cart/cart";
import {FormBuilder} from "@angular/forms";
import {CartService} from "./shared/cart.service";
import {CustomerService} from "./shared/customer.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {ShopService} from "./shared/shop.service";
import {environment} from "../environments/environment";
import {Shop} from "./models/shop/shop";

@Component({
  selector: 'wea5-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'CaaSShop1';
  shop: Shop

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getById(`${environment.tenantId}`).subscribe(res => {
      this.shop = res
    })
  }

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
