import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { NiceDatePipe } from './date';
import { ReplacePipe, AddressPipe, PhonePipe } from './text';



@NgModule({
	imports: [NgCommonModule],
	declarations: [NiceDatePipe, ReplacePipe, AddressPipe, PhonePipe],
	exports: [NiceDatePipe, ReplacePipe, AddressPipe, PhonePipe]
})
export class CommonModule {}
