//tslint:disable:use-host-property-decorator
import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lw-page-view',
	templateUrl: './page-view.component.html',
	styleUrls: ['./page-view.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: { class: 'lw-page-view' }
})
export class PageViewComponent {}

@Directive({
	selector: 'lw-page-view-header, [lwPageViewHeader]',
	host: { class: 'lw-page-view-header' }
})
export class PageViewHeaderDirective {}

@Directive({
	selector: 'lw-page-view-menu, [lwPageViewMenu]',
	host: { class: 'lw-page-view-menu' }
})
export class PageViewMenuDirective {}

@Directive({
	selector: 'lw-page-view-content, [lwPageViewContent]',
	host: { class: 'lw-page-view-content' }
})
export class PageViewContentDirective {}
