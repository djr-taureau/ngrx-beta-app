import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';

import * as fromCart from '@ngrx-beta-app/shared/state/cart';
import * as fromShipping from '@ngrx-beta-app/shared/state/shipping';

import { ShippingMethodSelectionDialogComponent } from '@ngrx-beta-app/cart/shipping-method-selection-dialog/shipping-method-selection-dialog.component';

@Component({
  selector: 'ngrx-beta-app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  total$ = this.store.pipe(select(fromCart.getTotal));
  shippingMethod$ = this.store.pipe(
    select(fromShipping.selectSelectedShippingOption)
  );
  NO_SHIPPING_METHOD_SELECTED_TOKEN =
    fromShipping.NO_SHIPPING_METHOD_SELECTED_TOKEN;

  constructor(private dialog: MatDialog, private store: Store<{}>) {}

  openShippingOptions() {
    this.dialog.open(ShippingMethodSelectionDialogComponent, {
      width: '450px'
    });
  }
}
