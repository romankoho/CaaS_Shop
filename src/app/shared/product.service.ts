import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {ProductPagedResult} from "../models/product/product-paged-result";
import {Direction} from "../models/base/parsed-pagination-token";
import * as globals from './globals';
import {ProductDetail} from "../models/product/productDetail";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {calculateThresholds} from "@angular-devkit/build-angular/src/utils/bundle-calculator";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductPagedResult[] = []

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'X-tenant-id': globals.tenantId,
      'Accept': 'application/json'
    })
  }

  public findByTextSearch(q: string, paginationDirection: Direction, skipToken:string | undefined, limit: number): Observable<ProductPagedResult> {
    let cleanSkipToken = ""

    if (skipToken != undefined) {
      cleanSkipToken = skipToken
    }

    return this.http.get<ProductPagedResult[]>(`${environment.server}/Product?q=${q}&paginationDirection=${paginationDirection}&$skiptoken=${cleanSkipToken}&limit=${limit}`
        , {headers: this.getHeader()}).pipe(map<any, ProductPagedResult[]>(res => res), catchError(this.errorHandler));
  }

  public findById(productId: string):Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${environment.server}/product/${productId}`, {headers: this.getHeader()})
      .pipe(map<any,ProductDetail>(res => res), catchError(this.errorHandler));
  }

}
