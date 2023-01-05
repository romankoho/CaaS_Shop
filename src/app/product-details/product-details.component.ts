import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductDetail} from "../models/product/productDetail";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../shared/product.service";
import {CartService} from "../shared/cart.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'wea5-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {

  @Input() product:ProductDetail

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private toast: NgToastService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.productService.findById(params['id']).subscribe(res => {
      this.product = res
    });
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next:(res) => {
        this.toast.success({detail: "Product Added!", summary:"1 piece added", duration: 5000})
        localStorage.setItem('WEA5.cart', JSON.stringify(res));
      },
      error:(e) => {
        this.toast.error({detail: "Uuups", summary:"Something Went Wrong", duration: 5000})
      }
    })
  }
}
