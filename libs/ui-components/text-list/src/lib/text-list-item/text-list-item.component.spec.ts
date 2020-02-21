import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextListItemComponent } from './text-list-item.component';

describe('TextListItemComponent', () => {
	let component: TextListItemComponent;
	let fixture: ComponentFixture<TextListItemComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [TextListItemComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TextListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
