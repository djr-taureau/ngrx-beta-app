import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('AppComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [
					RouterTestingModule,
					StoreModule.forRoot({}),
					EffectsModule.forRoot([])
				],
				declarations: [AppComponent]
			}).compileComponents();
		})
	);

	it(
		'should create the app',
		async(() => {
			const fixture = TestBed.createComponent(AppComponent);
			const app = fixture.debugElement.componentInstance;
			expect(app).toBeTruthy();
		})
	);
});
