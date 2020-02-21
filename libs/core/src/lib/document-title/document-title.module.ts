import { NgModule } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { is } from 'ramda';

const isEndOfNavigation = is(NavigationEnd);

@NgModule({})
export class DocumentTitleModule {
	constructor(private title: Title, private router: Router) {
		this.setupRouteEvents();
	}

	private setupRouteEvents() {
		this.router.events.subscribe(event => {
			if (isEndOfNavigation(event)) {
				const pageTitle = this.getTitle(
					this.router.routerState,
					this.router.routerState.root
				)
					.reverse()
					.join('-');
				this.title.setTitle(pageTitle);
			}
		});
	}

	getTitle(state, parent) {
		const data = [];
		if (parent && parent.snapshot.data && parent.snapshot.data.title) {
			data.push(parent.snapshot.data.title);
		}

		if (state && parent) {
			data.push(...this.getTitle(state, state.firstChild(parent)));
		}
		return data;
	}
}
