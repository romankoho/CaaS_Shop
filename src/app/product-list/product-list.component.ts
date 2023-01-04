import {Component, OnInit} from '@angular/core';
import {ProductPagedResult} from "../models/product/product-paged-result";
import {ProductService} from "../shared/product.service";
import {Direction} from "../models/base/parsed-pagination-token";

@Component({
  selector: 'wea5-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {

  pagedResult: ProductPagedResult

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.findByTextSearch("s", Direction.Forward, "", 20)
      .subscribe(res => this.pagedResult = res)
  }


}
