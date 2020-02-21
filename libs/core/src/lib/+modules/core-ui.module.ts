import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UiComponentsSideNavigationModule } from '@ngrx-beta-app/ui-components/side-navigation';


const MODULES = [
  UiComponentsSideNavigationModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
	imports: MODULES,
	exports: MODULES
})
export class CoreUIModule {}
