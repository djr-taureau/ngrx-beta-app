//tslint:disable: lw-value-list-header use-host-property-decorator
import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lw-value-list',
	templateUrl: './value-list.component.html',
	styleUrls: ['./value-list.component.scss'],
	host: { class: 'lw-value-list' },
	encapsulation: ViewEncapsulation.None
})
export class ValueListComponent {}
