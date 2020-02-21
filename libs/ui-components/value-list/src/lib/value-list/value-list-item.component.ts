//tslint:disable:lw-value-list-header use-host-property-decorator
import {
	Component,
	Directive,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'lw-value-list-item, [lwValueListItem]',
	templateUrl: './value-list-item.component.html',
	host: { class: 'lw-value-list-item' },
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueListItemComponent {}

@Directive({
	selector: 'lw-value-list-item-index, [lwValueListItemIndex]',
	host: { class: 'lw-value-list-item-index' }
})
export class ValueListItemIndexDirective {}

@Directive({
	selector: 'lw-value-list-item-text, [lwValueListItemText]',
	host: { class: 'lw-value-list-item-text' }
})
export class ValueListItemTextDirective {}

@Directive({
	selector: 'lw-value-list-item-value, [lwValueListItemValue]',
	host: { class: 'lw-value-list-item-value' }
})
export class ValueListItemValueDirective {}
