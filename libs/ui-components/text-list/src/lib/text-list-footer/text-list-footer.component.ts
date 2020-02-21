import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'lw-text-list-footer, [lwTextListFooter]',
	templateUrl: './text-list-footer.component.html',
	styleUrls: ['./text-list-footer.component.scss']
})
export class TextListLocationComponent implements OnInit {
	@Input() location: string;
	constructor() {}

	ngOnInit() {}
}
