import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDataAccessModule } from '@ngrx-beta-app/product-data-access';

import { ProductsStateModule } from '@ngrx-beta-app/shared/state/products';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDataAccessModule,
    ProductsStateModule,
    ProductsRoutingModule,
    MatSnackBarModule
  ]
})
export class ProductsModule {}
