//tslint:disable:directive-class-suffix: use-host-property-decorator
import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lw-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'lw-control-bar' },
})
export class ControlBarComponent{}


@Directive({
  selector: 'lw-control-bar-control, [lwControlBarControl]',
  host: { class: 'lw-control-bar-control' },
})
export class ControlBarControlDirective {}