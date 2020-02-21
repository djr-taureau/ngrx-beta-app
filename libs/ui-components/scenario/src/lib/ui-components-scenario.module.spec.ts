import { async, TestBed } from '@angular/core/testing';
import { UiComponentsScenarioModule } from './ui-components-scenario.module';

describe('UiComponentsScenarioModule', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [UiComponentsScenarioModule]
			}).compileComponents();
		})
	);

	it('should create', () => {
		expect(UiComponentsScenarioModule).toBeDefined();
	});
});
