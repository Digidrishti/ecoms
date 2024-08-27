import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
 
@Injectable()
export class LoadingInterceptorInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}
 
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.isLoading.next(false);
      })
    );
  }
}