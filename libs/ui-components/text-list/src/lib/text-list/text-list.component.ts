//tslint:disable: use-host-property-decorator directive-selector
import { Component, OnInit, ViewEncapsulation, Directive } from '@angular/core';

@Component({
	selector: 'lw-text-list',
	templateUrl: './text-list.component.html',
	styleUrls: ['./text-list.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: { class: 'lw-text-list' }
})
export class TextListComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}

@Directive({
	selector: 'lw-text-list-title, [lwTextListTitle]',
	host: { class: 'lw-text-list-title' }
})
export class TextListTitleDirective {}
