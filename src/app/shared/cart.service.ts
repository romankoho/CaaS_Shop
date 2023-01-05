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
import {CartItem} from "../models/cart/cart-item";
import {ProductMinimal} from "../models/product/productMinimal";
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  addToCart(productId:string): Observable<Cart> {
    const data = localStorage.getItem('WEA5.cart') || '[]'

    if(data !== '[]') {           //existing cart
      let cart:Cart = JSON.parse(data)
      let item = cart.items.find(item => item.product.id == productId)

      if (item == undefined) {    //add new product to cart
        let addCartItem: CartItem = {
          id: "",
          shopId: "",
          amount: 1,
          cartId: "",
          totalPrice: 0,
          product: {
            id: productId,
            shopId: "",
            price: 0
          }
        }
        cart.items.push(addCartItem)
      } else {                    //increase amount by 1
        item.amount++
      }

      return this.updateCart(cart.id, cart)

    } else {                    //create new cart
      let cart: Cart = {
        basePrice: 0,
        cartDiscounts: [],
        coupons: [],
        customer: {
          id: "",
          shopId: ""
        },
        discountValue: 0,
        lastAccess: "",
        id: uuidv4(),
        shopId: "",
        totalPrice: 0,
        items: [{
          id: "",
          shopId: "",
          amount: 1,
          cartId: "",
          totalPrice: 0,
          product: {
            id: productId,
            shopId: "",
            price: 0
          }
      }]
    }

      return this.updateCart(cart.id, cart)
    }
  }


  private mapCartToCartForUpdate(cart: Cart): CartForUpdate {
    let cartItems:CartItemForUpdate[] = []
    let coupons:CouponForCartUpdate[] = []

    for(let i = 0; i < cart.items.length; i++) {
      let product: ProductForCartItemUpdate = {
        id: cart.items[i].product.id
      }

      let cartItem: CartItemForUpdate = {
        amount: cart.items[i].amount,
        concurrencyToken: cart.items[i].concurrencyToken,
        product: product
      }

      cartItems.push(cartItem)
    }

    for (const item of cart.coupons) {
      let coupon: CouponForCartUpdate =
        {
          code: item.code
        }

      coupons.push(coupon)
    }

      return {
      customer: undefined,
        items: cartItems,
        coupons: coupons,
        concurrencyToken: cart.concurrencyToken
      }
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
