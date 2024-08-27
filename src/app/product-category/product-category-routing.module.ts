import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ProductDetailsComponent,
  // },
  {
    path: ':id',
   component: ProductDetailsComponent,
  },
  {
    path: '',
    loadChildren: () => import('./nestedmodule/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
