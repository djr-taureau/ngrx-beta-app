//tslint:disable:use-host-property-decorator
import { Directive } from '@angular/core';

@Directive({
	selector: '[lwWidgetLink]',
	host: { class: 'lw-widget-link' }
})
export class WidgetLinkDirective {}
