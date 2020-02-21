import {
	Component,
	OnInit,
	ViewChildren,
	ElementRef,
	Directive,
	QueryList,
	AfterViewInit,
	Renderer2
} from '@angular/core';
import { icons } from '../data/data';
import { setCurrentDrag } from '../../../../core/src/lib/behaviors';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '.goals-list-item'
})
export class GoalListItemDirective {}

@Component({
	selector: 'lw-scenario-goals',
	templateUrl: './scenario-goals.component.html',
	styleUrls: ['./scenario-goals.component.scss']
})
export class ScenarioGoalsComponent implements OnInit, AfterViewInit {
	@ViewChildren(GoalListItemDirective, { read: ElementRef })
	goalsListItems: QueryList<ElementRef>;
	icons = icons;

	constructor(private renderer: Renderer2) {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.goalsListItems.forEach(goalsListItem => {
			this.renderer.listen(
				goalsListItem.nativeElement,
				'dragstart',
				this.handleIconDragStart.bind(this)
			);
		});
	}

	handleIconDragStart(e) {
		const draggedGoal = e.target.dataset.goal;
		setCurrentDrag(draggedGoal, e, icons[draggedGoal].dragImage);
	}
}
