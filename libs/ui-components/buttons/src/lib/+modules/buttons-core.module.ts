import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

const MODULES = [NgCommonModule];

@NgModule({
	imports: [MODULES],
	exports: [MODULES]
})
export class ButtonsCoreModule {}
