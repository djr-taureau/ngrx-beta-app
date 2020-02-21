//tslint:disable:directive-class-suffix: use-host-property-decorator
import { Component, Input, HostBinding} from '@angular/core';

@Component({
  selector: 'lw-badge, [lwBadge]',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  host: { class: 'lw-badge' },
})
export class BadgeComponent{
  @Input()
  @HostBinding('class.with-dot')
  useDot = false
}
