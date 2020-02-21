import { NgModule } from '@angular/core';
import { MatTabsModule, MatIconModule, MatMenuModule } from '@angular/material';
import { UiComponentsLayoutsModule } from '@ngrx-beta-app/ui-components/layouts';

const MODULES = [
	MatMenuModule,
	MatTabsModule, MatIconModule, UiComponentsLayoutsModule];

@NgModule({
	exports: MODULES
})
export class PageNavigationUIModule {}
