import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonRoutingModule } from './common-routing.module';
import { PageNotFoundComponent } from './errorPages/page-not-found/page-not-found.component';
import { CssTrickComponent } from './css-trick/css-trick.component';
import { CustomePopupComponent } from './custome-popup/custome-popup.component';

// import { WishListComponent } from './wish-list/wish-list.component';
// import { ProductDetailsComponent } from './product-details/product-details.component';
// import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
    // AddToCartComponent,
    // ProductDetailsComponent,
    // WishListComponent,
    PageNotFoundComponent,
    CssTrickComponent,
    CustomePopupComponent    
    
  ],
  providers:[],
  imports: [
    CommonModule,
    CommonRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents:[]
})
export class CommonModule { }
