import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs';
import {ProductService} from "../shared/product.service";
import {ProductMinimal} from "../models/product/productMinimal";
import {Direction} from "../models/base/parsed-pagination-token";
import {ProductPagedResult} from "../models/product/product-paged-result";

@Component({
  selector: 'wea5-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  constructor(private productService: ProductService) { }

  isLoading: boolean = false;
  foundProducts: ProductMinimal[] | undefined = [];
  @Output() productSelected = new EventEmitter<ProductMinimal>();
  myKeyup = new EventEmitter<string>();

  ngOnInit() {
    this.myKeyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.productService.findByTextSearch(searchTerm, Direction.Forward, null, 3)),
      tap(() => this.isLoading = false)
    ).subscribe(products => this.foundProducts = products.items);
  }

}
