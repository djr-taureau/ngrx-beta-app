//tslint:disable: use-host-property-decorator directive-selector
import { Component, OnInit, Directive, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lw-side-nav',
	template: '<ng-content></ng-content>',
	styleUrls: ['./side-nav.component.scss'],
	host: { class: 'lw-side-nav' },
	encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}

@Directive({
	selector: 'lw-navigation-group',
	host: { class: 'lw-navigation-group' }
})
export class NavigationGroupDirective {}

@Directive({
	selector: 'lw-navigation-title',
	host: { class: 'lw-navigation-title' }
})
export class NavigationTitleDirective {}
