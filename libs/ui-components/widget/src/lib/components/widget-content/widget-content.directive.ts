//tslint:disable:directive-selector
//tslint:disable:use-host-property-decorator
import { Directive } from '@angular/core';

@Directive({
	selector: '[lwWidgetContent], lw-widget-content,',
	host: { class: 'lw-widget-content' }
})
export class WidgetContentDirective {}
