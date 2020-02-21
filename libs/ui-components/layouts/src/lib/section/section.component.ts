//tslint:disable:directive-class-suffix: use-host-property-decorator
import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lw-section',
  template: '<ng-content></ng-content>',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'lw-section' },
})
export class SectionComponent{ }

@Directive({
  selector: 'lw-section-header, [lwSectionHeader]',
  host: { class: 'lw-section-header' },
})
export class SectionHeaderDirective {}

@Directive({
  selector: 'lw-section-footer, [lwSectionFooter]',
  host: { class: 'lw-section-footer' },
})
export class SectionFooterDirective {}

@Directive({
  selector: 'lw-section-content, [lwSectionContent]',
  host: { class: 'lw-section-content' },
})
export class SectionContentDirective {}