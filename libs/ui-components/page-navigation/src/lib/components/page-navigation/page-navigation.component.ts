import { Component, OnInit } from '@angular/core';
import { NavigationItems } from '@ngrx-beta-app/common';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'lw-page-navigation',
	templateUrl: './page-navigation.component.html',
	styleUrls: ['./page-navigation.component.scss']
})
export class PageNavigationComponent implements OnInit {
	navigation: NavigationItems;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.navigation = this.route.snapshot.data
			.pageNavigation as NavigationItems;
	}

	swallow(event: MouseEvent) {
		event.stopImmediatePropagation();
		event.preventDefault();
	}
}
