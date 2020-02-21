import { async, TestBed } from '@angular/core/testing';
import { UiComponentsTextListModule } from './ui-components-text-list.module';

describe('UiComponentsTextListModule', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [UiComponentsTextListModule]
			}).compileComponents();
		})
	);

	it('should create', () => {
		expect(UiComponentsTextListModule).toBeDefined();
	});
});
