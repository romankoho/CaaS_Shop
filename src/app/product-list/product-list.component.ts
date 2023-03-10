import {Component, OnInit} from '@angular/core';
import {ProductPagedResult} from "../models/product/product-paged-result";
import {ProductService} from "../shared/product.service";
import {Direction} from "../models/base/parsed-pagination-token";
import {NgToastService} from "ng-angular-popup";
import {CartService} from "../shared/cart.service";
import {environment} from "../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'wea5-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {

  pagedResult: ProductPagedResult = {
    firstPage: {
      direction: Direction.Forward
    },
    lastPage: {
      direction: Direction.Forward
    },
    nextPage: {
      direction: Direction.Forward
    },
    previousPage: {
      direction: Direction.Forward
    },
    totalCount: 0,
    totalPages: 0

  }
  currentPage: number = 0
  searchTerm: string = ""
  disablePrevious: boolean = true
  disableNext: boolean = true

  constructor(private productService: ProductService, private cartService: CartService, private translate: TranslateService,
              private toast: NgToastService) {
  }

  ngOnInit(): void {

  }

  searchTriggered($event: string) {
    if ($event.length > 0) {

      let emptyTransl: string
      this.translate.get('toast.soEmpty').subscribe((res: string) => {
        emptyTransl = res;
      })

      let nothingFoundTransl: string
      this.translate.get('toast.noProductsFound').subscribe((res: string) => {
        nothingFoundTransl = res;
      })


      this.productService.findByTextSearch($event, Direction.Forward, undefined, 10).subscribe((res) => {
        this.pagedResult = res
        if (this.pagedResult.items?.length == 0) {
          this.toast.error({detail: emptyTransl, summary: nothingFoundTransl, duration: 5000})
        } else {
          this.currentPage = 1
        }

        this.searchTerm = $event

        if (this.pagedResult.nextPage != undefined) {
          this.disableNext = false
        }
      })
    }
  }

  navigateToPreviousPage() {
    this.productService.findByTextSearch(this.searchTerm, Direction.Backward, this.pagedResult.previousPage.reference, 10).subscribe((res) => {
      this.pagedResult = res
      this.currentPage--
      if (this.currentPage == 1) {
        this.disablePrevious = true
      }
    })

  }

  navigateToNextPage() {
    this.productService.findByTextSearch(this.searchTerm, Direction.Forward, this.pagedResult.nextPage.reference, 10).subscribe((res) => {
      this.pagedResult = res
      this.currentPage++
      this.disablePrevious = false

      if (this.pagedResult.nextPage == undefined) {
        this.disableNext = false
      }
    })
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
      next: (res) => {
        this.toast.success({detail: addedTransl, summary: pieceTransl, duration: 5000})
        localStorage.setItem(`${environment.tenantId}.cart`, JSON.stringify(res));
      },
      error: (e) => {
        this.toast.error({detail: "Uuups", summary: errorTransl, duration: 5000})
      }
    })
  }
}
