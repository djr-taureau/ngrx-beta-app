import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Status } from '../models';

@Component({
	selector: 'lw-status-list-status',
	templateUrl: './status-list-status.component.html',
	styleUrls: ['./status-list-status.component.scss']
})
export class StatusListStatusComponent implements OnInit {
	@Input() status: Status;

	constructor() {}

	@HostBinding('class') classes = '';

	buildClassNames = type => `lw-status-list-status-${type}`;

	ngOnInit() {
		this.classes = this.buildClassNames(
			this.status.toLowerCase().replace(' ', '-')
		);
	}
}
