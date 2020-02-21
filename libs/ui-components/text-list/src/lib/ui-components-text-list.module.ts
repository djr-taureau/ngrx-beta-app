import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	TextListComponent,
	TextListTitleDirective
} from './text-list/text-list.component';
import { TextListItemComponent } from './text-list-item/text-list-item.component';
import { TextListItemHeaderComponent } from './text-list-item-header/text-list-item-header.component';
import { TextListLocationComponent } from './text-list-footer/text-list-footer.component';
@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [
		TextListComponent,
		TextListItemComponent,
		TextListItemHeaderComponent,
		TextListTitleDirective,
		TextListLocationComponent
	],
	exports: [
		TextListComponent,
		TextListItemComponent,
		TextListItemHeaderComponent,
		TextListTitleDirective,
		TextListLocationComponent
	]
})
export class UiComponentsTextListModule {}
