import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { classWithModifiers } from '@ngrx-beta-app/common';

@Component({
	selector: 'lw-value-callout-footer',
	templateUrl: './value-callout-footer.component.html',
	styleUrls: ['./value-callout-footer.component.scss']
})
export class DashboardOverviewFooterComponent implements OnInit {
	@Input() arrow: string;
	elementName = 'lw-value-callout-footer';

	constructor() {}

	@HostBinding('class') classes = '';

	ngOnInit() {
		this.classes = classWithModifiers(this.elementName, this.arrow);
	}
}
