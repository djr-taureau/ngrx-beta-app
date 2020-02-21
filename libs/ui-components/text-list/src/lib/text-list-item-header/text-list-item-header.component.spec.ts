import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextListItemHeaderComponent } from './text-list-item-header.component';

describe('TextListItemHeaderComponent', () => {
	let component: TextListItemHeaderComponent;
	let fixture: ComponentFixture<TextListItemHeaderComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [TextListItemHeaderComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TextListItemHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
