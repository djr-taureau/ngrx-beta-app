import { NgModule } from '@angular/core';
import { UiComponentsCoreModule } from '@ngrx-beta-app/ui-components';

const MODULES = [UiComponentsCoreModule];

@NgModule({
	imports: [MODULES],
	exports: [MODULES]
})
export class ValueListUIModule {}
