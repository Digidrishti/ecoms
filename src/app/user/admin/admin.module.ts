import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule, } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { UserTrackerComponent } from './user-tracker/user-tracker.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { PreviewImgComponent } from './preview-img/preview-img.component';


@NgModule({
  declarations: [
    AddProductComponent,
    EditProductComponent,
    ProductManagementComponent,
    AdminSideBarComponent,
    UserTrackerComponent,
    ProgressBarComponent,
    PreviewImgComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class AdminModule { }
