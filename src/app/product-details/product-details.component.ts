import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductDetail} from "../models/product/productDetail";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../shared/product.service";
import {CartService} from "../shared/cart.service";
import {NgToastService} from "ng-angular-popup";
import {environment} from "../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

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
              private toast: NgToastService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.productService.findById(params['id']).subscribe(res => {
      this.product = res
    });
  }

  addToCart(productId: string) {

    let addedTransl: string
    this.translate.get('toast.productAdded').subscribe((res: string) => {
      addedTransl = res;
    })

    let pieceTransl: string
    this.translate.get('toast.pieceAdded').subscribe((res: string) => {
      pieceTransl = res;
    })

    let errorTransl: string
    this.translate.get('toast.somethingWentWrong').subscribe((res: string) => {
      errorTransl = res;
    })

    this.cartService.addToCart(productId).subscribe({
      next:(res) => {
        this.toast.success({detail: addedTransl, summary:pieceTransl, duration: 5000})
        localStorage.setItem(`${environment.tenantId}.cart`, JSON.stringify(res));
      },
      error:(e) => {
        this.toast.error({detail: "Uuups", summary:errorTransl, duration: 5000})
      }
    })
  }
}
