import {Component, Input, OnInit} from '@angular/core';
import {ProductDetail} from "../models/product/productDetail";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'wea5-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {

  @Input() product:ProductDetail = new ProductDetail()

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.productService.findById(params['id']).subscribe(res => {
      this.product = res
    });
  }

  addToCart(id: string) {
    
  }
}
