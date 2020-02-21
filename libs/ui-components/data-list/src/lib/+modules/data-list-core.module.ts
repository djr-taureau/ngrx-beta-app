import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const MODULES = [NgCommonModule, RouterModule];

@NgModule({
	imports: [MODULES],
	exports: [MODULES]
})
export class DataListCoreModule {}
