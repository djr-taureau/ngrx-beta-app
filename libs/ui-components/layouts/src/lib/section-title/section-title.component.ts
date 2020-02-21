//tslint:disable:directive-class-suffix: use-host-property-decorator
import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lw-section-title, [lwSectionTitle]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./section-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'lw-section-title' },
})
export class SectionTitleComponent{ }


@Directive({
  selector: 'lw-section-subtitle, [lwSectionSubtitle]',
  host: { class: 'lw-section-subtitle' },
})
export class SectionSubtitleDirective {}