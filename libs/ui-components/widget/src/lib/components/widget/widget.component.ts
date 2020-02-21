//tslint:disable:use-host-property-decorator
import {
	Component,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';

@Component({
	selector: 'lw-widget',
	exportAs: 'lwWidget',
	templateUrl: './widget.component.html',
	styleUrls: ['./widget.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'lw-widget' }
})
export class WidgetComponent {}
