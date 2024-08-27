import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/app/common/api-endpoint';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'}
)
export class AdminService {

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

  public deleteStudent(id: any) {
    const url = EndPoints.APIURL.deleteProduct.replace('{0}', environment.serviceBaseUrls.DOMAIN01).replace('{1}', id);
    return this.http.delete<any>(url)
  }

  public editForm(payload:any,id: any) { 
    const url = EndPoints.APIURL.editProduct.replace('{0}', environment.serviceBaseUrls.DOMAIN01).replace('{1}', id);
    return this.http.put(url,payload)
  }

  public addType(payload:any) {
    const url = EndPoints.APIURL.addType.replace('{0}', environment.serviceBaseUrls.DOMAIN01);
    return this.http.post<any>(url,payload)
  }

}
