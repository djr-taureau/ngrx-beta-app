//tslint:disable:lw-value-list-header use-host-property-decorator
import {
	Component,
	Directive,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'lw-value-list-header, [lwValueListHeader]',
	templateUrl: './value-list-header.component.html',
	host: { class: 'lw-value-list-header' },
	encapsulation: ViewEncapsulation.None
})
export class ValueListHeaderComponent {}

@Directive({
	selector: 'lw-value-list-header-icon, [lwValueListHeaderIcon]',
	host: { class: 'lw-value-list-header-icon' }
})
export class ValueListHeaderIconDirective {}

@Directive({
	selector: 'lw-value-list-header-title, [lwValueListHeaderTitle]',
	host: { class: 'lw-value-list-header-title' }
})
export class ValueListHeaderTitleDirective {}

@Directive({
	selector: 'lw-value-list-header-column, [lwValueListHeaderColumn]',
	host: { class: 'lw-value-list-header-column' }
})
export class ValueListHeaderColumnDirective {}
