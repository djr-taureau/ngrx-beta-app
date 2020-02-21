import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextListLocationComponent } from './text-list-footer.component';

describe('TextListLocationComponent', () => {
	let component: TextListLocationComponent;
	let fixture: ComponentFixture<TextListLocationComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [TextListLocationComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TextListLocationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
