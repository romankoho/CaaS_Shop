import {Component, OnInit} from '@angular/core';
import {ProductPagedResult} from "../models/product/product-paged-result";
import {ProductService} from "../shared/product.service";
import {Direction} from "../models/base/parsed-pagination-token";
import {NgToastService} from "ng-angular-popup";
import {CartService} from "../shared/cart.service";
import {Cart} from "../models/cart/cart";
import {CartItem} from "../models/cart/cart-item";
import {ProductMinimal} from "../models/product/productMinimal";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'wea5-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {

  pagedResult: ProductPagedResult

  constructor(private productService: ProductService, private cartService: CartService,
              private toast: NgToastService) { }

  ngOnInit(): void {
  }

  updateList($event: string) {
    if($event.length > 0) {
      this.productService.findByTextSearch($event, Direction.Forward, null, 10).subscribe((res) => {
        this.pagedResult = res
        if(this.pagedResult.items?.length == 0) {
          this.toast.error({detail: "So Much Empty", summary:"No Products Found", duration: 5000})
        }
      })
    }

  }

  addToCart(productId:string) {
    const data = localStorage.getItem('WEA5.cart') || '[]'

    if(data !== '[]') {           //existing cart
      let cart:Cart = JSON.parse(data)
      let item = cart.items.find(item => item.product.id == productId)

      if (item == undefined) {    //add new product to cart
        let addCartItem = new CartItem("", new ProductMinimal(productId),"", "", 1)
        cart.items.push(addCartItem)
      } else {                    //increase amount by 1
        item.amount++
      }

      this.cartService.updateCart(cart.id, cart).subscribe({
        next:(res) => {
          console.log("success case")
          this.toast.success({detail: "Product Added!", summary:"1 piece added", duration: 5000})
          localStorage.setItem('WEA5.cart', JSON.stringify(res));
        },
        error:(e) => {
          this.toast.error({detail: "Uuups", summary:"Something Went Wrong", duration: 5000})
        }
      })

    } else {                    //create new cart
      let cart: Cart = new Cart()
      let addCartItem = new CartItem("", new ProductMinimal(productId),"", "", 1)
      cart.items.push(addCartItem)
      let cartId = uuidv4();

      this.cartService.updateCart(cartId, cart).subscribe({
        next:(res) => {
          console.log("success case")
          this.toast.success({detail: "Product Added!", summary:"1 piece added", duration: 5000})
          localStorage.setItem('WEA5.cart', JSON.stringify(res));
        },
        error:(e) => {
          this.toast.error({detail: "Uuups", summary:"Something Went Wrong", duration: 5000})
        }
      })
    }
  }
}
