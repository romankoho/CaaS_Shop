import {Component, OnInit} from '@angular/core';
import {Cart} from "./models/cart/cart";
import {ShopService} from "./shared/shop.service";
import {environment} from "../environments/environment";
import {Shop} from "./models/shop/shop";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'wea5-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'CaaSShop1';
  shop: Shop = {
    cartLifetimeMinutes: 0, id: "",
    shopAdmin: {
      shopId: "",
      id: ""
    }
  }

  language: string = 'en'

  constructor(private shopService: ShopService, private translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.shopService.getById(`${environment.tenantId}`).subscribe(res => {
      this.shop = res
    })
  }

  productsInCart() : number{
    const data = localStorage.getItem(`${environment.tenantId}.cart`) || '[]'

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

  switchLang(lang: string) {
    this.language = lang
    this.translate.set
    this.translate.setDefaultLang(lang)
  }
}
