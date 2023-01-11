import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Shop} from "../models/shop/shop";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  public getById(shopId: string):Observable<Shop> {
    let header = new HttpHeaders({
      'X-tenant-id': `${environment.tenantId}`,
      'Accept': 'application/json'
    })

    return this.http.get<Shop>(`${environment.server}/shopadministration/${shopId}`, {headers:header })
      .pipe(map<any,Shop>(res => res));
  }
}
