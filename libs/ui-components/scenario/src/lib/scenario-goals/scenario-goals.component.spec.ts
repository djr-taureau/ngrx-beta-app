import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioGoalsComponent } from './scenario-goals.component';

describe('ScenarioGoalsComponent', () => {
  let component: ScenarioGoalsComponent;
  let fixture: ComponentFixture<ScenarioGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
