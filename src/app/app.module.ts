import { LoadingInterceptorInterceptor } from './loading-interceptor.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
// import { HomeComponent } from './home/home/home.component';
import { AddToCartComponent } from './common/add-to-cart/add-to-cart.component';
// import { LoginComponent } from './auth/login/login/login.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductDetailsComponent } from './common/product-details/product-details.component';
import { WishListComponent } from './common/wish-list/wish-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorInterceptor } from './http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoaderComponent } from './loader/loader.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CssTrickComponent } from './common/css-trick/css-trick.component';
import { FlexboxComponent } from './css/flexbox/flexbox.component';
import { LiveLocationTrackerComponent } from './common/live-location-tracker/live-location-tracker.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LiveLocationTrackerComponent,
    // HomeComponent,
    AddToCartComponent, ProductDetailsComponent, WishListComponent, LoaderComponent, RxjsComponent, CssTrickComponent, FlexboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorInterceptor, multi: true },


  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
