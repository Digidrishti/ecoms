import { CssTrickComponent } from './common/css-trick/css-trick.component';
import { WishListComponent } from './common/wish-list/wish-list.component';
import { ProductDetailsComponent } from './common/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartComponent } from './common/add-to-cart/add-to-cart.component';
import { PageNotFoundComponent } from './common/errorPages/page-not-found/page-not-found.component';
import { FlexboxComponent } from './css/flexbox/flexbox.component';
import { LiveLocationTrackerComponent } from './common/live-location-tracker/live-location-tracker.component';

const routes: Routes = [
  { path: 'productDetails/:id', component:ProductDetailsComponent},
  { path: 'addToCart/:id', component: AddToCartComponent },
  { path: 'wishlist', component: WishListComponent },
  {path:'liveTracking', component: LiveLocationTrackerComponent},
  {
    path: 'admin',
    loadChildren: () => import ('./user/admin/admin.module').then(m => m.AdminModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: "full"
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  
  {
    path: 'productCategory',
    loadChildren: () => import('./product-category/product-category.module').then(m => m.ProductCategoryModule)
  },

    {
      path: '',
      loadChildren:()=> import('./home/home.module').then(m => m.HomeModule)
    },
  {
    path: 'css',
    component : CssTrickComponent
  },
  {
    path: 'flexbox',
    component : FlexboxComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },

  //dont add any route after this this will failed to load route
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
