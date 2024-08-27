import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../common/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    ) { }

  public createUser(payload: any): Observable<any> {
    const url = EndPoints.APIURL.register.replace('{0}', environment.serviceBaseUrls.DOMAIN01);
    return this.http.post<any>(url, payload);
  }

  public login(payload: any): Observable<any> {
    const url = EndPoints.APIURL.login.replace('{0}', environment.serviceBaseUrls.DOMAIN01);
    return this.http.post<any>(url, payload);
  }

  public validateEmail(payload: any): Observable<any> {
    const url = EndPoints.APIURL.verifyEmail.replace('{0}', environment.serviceBaseUrls.DOMAIN01);
    return this.http.post<any>(url, payload);
  }

  public verifyOTP(payload: any): Observable<any> {
    const url = EndPoints.APIURL.verifyOTP.replace('{0}', environment.serviceBaseUrls.DOMAIN01);
    return this.http.post<any>(url, payload);
  }

  public setNewPassword(payload: any): Observable<any> {
    const url = EndPoints.APIURL.setNewPassword.replace('{0}', environment.serviceBaseUrls.DOMAIN01);
    return this.http.post<any>(url, payload);
  }

}
