import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import * as globals from "./globals";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Cart} from "../models/cart/cart";
import {CartForUpdate} from "../models/cart/cart-for-update";
import {CartItemForUpdate} from "../models/cart/cart-item-for-update";
import {CouponForCartUpdate} from "../models/coupon/coupon-for-cart-update";
import {ProductForCartItemUpdate} from "../models/product/product-for-cart-item-update";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  private mapCartToCartForUpdate(cart: Cart): CartForUpdate {
    let cartItems:CartItemForUpdate[] = []
    let coupons:CouponForCartUpdate[] = []

    for(let i = 0; i < cart.items.length; i++) {
      let product = new ProductForCartItemUpdate(cart.items[i].product.id)
      cartItems.push(new CartItemForUpdate(product, cart.items[i].amount, cart.items[i].concurrencyToken))
    }

    for (const item of cart.coupons) {
      coupons.push(new CouponForCartUpdate(item.code))
    }

    return new CartForUpdate(undefined, cartItems, coupons, cart.concurrencyToken)
  }

  public getById(cartId: string): Observable<Cart> {
    const header = new HttpHeaders({
      'X-tenant-id': globals.tenantId,
      'Accept': 'application/json'
    })

    return this.http.get<Cart>(`${environment.server}/Cart/${cartId}`, {headers: header})
      .pipe(map<any, Cart>(res => res), catchError(this.errorHandler));
  }

  public updateCart(cartId: string, cart: Cart): Observable<Cart> {
    const header = new HttpHeaders({
      'X-tenant-id': globals.tenantId,
      'Content-Type': 'application/json'
    })

    return this.http.post<CartForUpdate>(`${environment.server}/cart/${cartId}`, this.mapCartToCartForUpdate(cart) , {headers:header})
      .pipe(map<any, Cart>(res => res))
  }

}
