import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioComponent } from './scenario/scenario.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {
	ChartSelectorDirective,
	DragDetectionDirective,
	EChartSelectorDirective
} from './scenario-chart/scenario-chart.component';
import { GoalListItemDirective } from './scenario-goals/scenario-goals.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScenarioGoalsComponent } from './scenario-goals/scenario-goals.component';
import { ScenarioChartComponent } from './scenario-chart/scenario-chart.component';
@NgModule({
	imports: [
		CommonModule,
		NgxEchartsModule,
		MatDatepickerModule,
		MatFormFieldModule
	],
	declarations: [
		ScenarioComponent,
		GoalListItemDirective,
		ChartSelectorDirective,
		DragDetectionDirective,
		ScenarioGoalsComponent,
		ScenarioChartComponent,
		EChartSelectorDirective
	],
	exports: [
		ScenarioComponent,
		GoalListItemDirective,
		ChartSelectorDirective,
		DragDetectionDirective,
		ScenarioGoalsComponent,
		ScenarioChartComponent,
		EChartSelectorDirective
	]
})
export class UiComponentsScenarioModule {}
