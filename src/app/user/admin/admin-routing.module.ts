import { EditProductComponent } from './edit-product/edit-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { UserTrackerComponent } from './user-tracker/user-tracker.component';

const routes: Routes = [
  {
    path: '',
    component: ProductManagementComponent,
    children: [
      {
        path: '',
        component:AddProductComponent
      },
      {
        path: 'edit-product',
        component:EditProductComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'userTracker',
        component: UserTrackerComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }