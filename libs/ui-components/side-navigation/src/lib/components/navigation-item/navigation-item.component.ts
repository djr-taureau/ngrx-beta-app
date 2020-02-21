//tslint:disable:use-input-property-decorator use-host-property-decorator
import {
	Component,
	ViewEncapsulation,
	ElementRef,
	EventEmitter,
	Output,
	Input
} from '@angular/core';
import {
	ComponentHostBase,
	mixinNavigation,
	HasNavigation
} from '@ngrx-beta-app/ui-components/core';


export const _NavigationItemBase = mixinNavigation(ComponentHostBase);

@Component({
	selector: 'lw-navigation-item',
	inputs: ['location', 'wrapWithAnchor', 'action'],
	templateUrl: './navigation-item.component.html',
	styleUrls: ['./navigation-item.component.scss'],
	host: { class: 'lw-navigation-item' },
	encapsulation: ViewEncapsulation.None
})
export class NavigationItemComponent extends _NavigationItemBase
	implements HasNavigation {
  @Output() event: EventEmitter<string> = new EventEmitter<string>();
  @Input() icon: string;


	constructor(public _elementRef: ElementRef) {
    super(_elementRef);
  }

	raiseEvent() {
    this.event.emit(null);
    console.log(event);
  }

}

