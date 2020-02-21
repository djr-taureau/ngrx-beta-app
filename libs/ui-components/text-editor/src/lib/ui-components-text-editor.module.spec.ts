import { async, TestBed } from '@angular/core/testing';
import { UiComponentsTextEditorModule } from './ui-components-text-editor.module';

describe('UiComponentsTextEditorModule', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [UiComponentsTextEditorModule]
			}).compileComponents();
		})
	);

	it('should create', () => {
		expect(UiComponentsTextEditorModule).toBeDefined();
	});
});
