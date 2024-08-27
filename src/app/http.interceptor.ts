import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
  
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private toastrService: ToastrService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(request);
    const API_KEY = "test 1"
    const req = request.clone({
      setHeaders: {
        API_KEY,
      }
    })

    // const StartTime = (new Date()).getTime();
    return next.handle(request).pipe(
      // map(event => {
      //   const endTime = (new Date()).getTime();
      //   const Diffrence = endTime - StartTime;
      //   // console.log(event.url + 'sucess in ' + Diffrence+' seconds');
      //   return event;
      // }),
     
      // retry({
      //   count: 2,
      //   delay: (_, retryCount) => timer(retryCount * 1000), //
        
      // }),
      
      catchError(error => {
        console.log('hey erro occur');
        this.errorHandling(error);
        // this.flushAllLocalData();
        return throwError(() => error)
      })  
    )
  }



  private errorHandling(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        this.toastrService.error('', 'Bad Request: The server did not understand the request.');
        break;
      case 401:
        this.toastrService.error('', 'Unauthorized: You are not authorized to access this resource.');
        break;
      case 402:
        this.toastrService.error('', 'Unauthorized: You are not authorized to access this resource.');
        break;
      case 403:
        this.toastrService.error('', 'Forbidden: Access to this resource is forbidden.');
        break;
      case 404:
        this.toastrService.error('', 'Not Found: The requested resource was not found on the server.');
        break;
      case 500:
        this.toastrService.error('hello', 'Internal Server Error: The server encountered an unexpected condition.');
        break;
      default:
        this.toastrService.error('', 'An unexpected error occured');
        break;
    }

  }

  private flushAllLocalData() {
    localStorage.clear();
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/home']);
  }
}