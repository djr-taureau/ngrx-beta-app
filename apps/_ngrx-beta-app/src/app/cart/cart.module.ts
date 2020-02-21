import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CartDataAccessModule } from '@ngrx-beta-app/cart-data-access';
import { ShippingDataAccessModule } from '@ngrx-beta-app/shipping-data-access';
import { CartStateModule } from '@ngrx-beta-app/shared/state/cart';
import { ShippingStateModule } from '@ngrx-beta-app/shared/state/shipping';

import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { ShippingMethodSelectionDialogComponent } from './shipping-method-selection-dialog/shipping-method-selection-dialog.component';

@NgModule({
  declarations: [CartComponent, ShippingMethodSelectionDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CartRoutingModule,
    CartDataAccessModule,
    CartStateModule,
    ShippingDataAccessModule,
    ShippingStateModule
  ],
  entryComponents: [ShippingMethodSelectionDialogComponent]
})
export class CartModule {}
