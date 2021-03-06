import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
	PageViewComponent,
	PageViewHeaderDirective,
	PageViewMenuDirective,
	PageViewContentDirective
} from './page-view.component';

describe('PageComponent', () => {
	let component: PageViewComponent;
	let fixture: ComponentFixture<PageViewComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					PageViewComponent,
					PageViewHeaderDirective,
					PageViewMenuDirective,
					PageViewContentDirective
				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PageViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
