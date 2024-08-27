import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../common/api-endpoint';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'}
)
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  public addNewProduct(payload:any) {
    const url = EndPoints.APIURL.addProduct.replace('{0}', environment.serviceBaseUrls.DOMAIN01);
    return this.http.post<any>(url,payload)
  }

  public getAllUsers() {
    const url = EndPoints.APIURL.getAllUsers.replace('{0}', environment.serviceBaseUrls.DOMAIN01);
    return this.http.get<any>(url)
  }

}
