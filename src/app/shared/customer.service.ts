import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Customer} from "../models/customer/customer";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  public getByEMail(email:string): Observable<Customer>{
    let header = new HttpHeaders({
      'X-tenant-id': `${environment.tenantId}`,
      'Accept': 'application/json'
    })

    return this.http.get<Customer>(`${environment.server}/customer/${email}`, {headers:header})
      .pipe(map<any, Customer>(res => res))
  }
}
