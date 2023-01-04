import {Component, OnInit} from '@angular/core';
import {ProductPagedResult} from "../models/product/product-paged-result";
import {ProductService} from "../shared/product.service";
import {Direction} from "../models/base/parsed-pagination-token";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'wea5-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {

  pagedResult: ProductPagedResult

  constructor(private productService: ProductService, private toast: NgToastService) { }

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
}
