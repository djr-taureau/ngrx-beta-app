import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'lw-text-list-item-header, [lwTextListItemHeader]',
	templateUrl: './text-list-item-header.component.html',
	styleUrls: ['./text-list-item-header.component.scss']
})
export class TextListItemHeaderComponent implements OnInit {
	@Input() location: string;
	constructor() {}

	ngOnInit() {}
}
