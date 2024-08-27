import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSideBarComponent } from './product-side-bar/product-side-bar.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductSideBarComponent,
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  providers: [
  ]

})
export class ProductCategoryModule { }
