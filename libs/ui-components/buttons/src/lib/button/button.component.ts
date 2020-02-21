//tslint:disable:component-selector use-host-property-decorator use-input-property-decorator
import {
	Component,
	OnInit,
	ElementRef,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';
import {
	HasColor,
	mixinColor,
	ComponentHostBase
} from '@ngrx-beta-app/ui-components';

export const _ButtonComponentBase = mixinColor(ComponentHostBase);

/**
 * List of classes to add to MatButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
	'lw-button',
	'lw-rounded-button',
	'lw-round-button',
	'lw-icon-button',
	'lw-text-button'
];

@Component({
	selector:
		'button[lw-button],button[lw-icon-button],button[lw-rounded-button],button[lw-round-button],button[lw-text-button]',
	exportAs: 'lwButton',
	host: {
		'[disabled]': 'disabled || null'
	},
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	inputs: ['disabled', 'color'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends _ButtonComponentBase implements HasColor {
	constructor(elementRef: ElementRef) {
		super(elementRef);

		this._addAttributeClasses(BUTTON_HOST_ATTRIBUTES);
	}

	focus(): void {
		this._getHostElement().focus();
	}
}
