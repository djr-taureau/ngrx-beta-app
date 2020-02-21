import { Injectable, Inject, InjectionToken } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { NavigationItems } from './types';
import { sortNestedByOrder } from '@ngrx-beta-app/common';


export const APP_NAVIGATION = new InjectionToken<NavigationItems>(
	'AppNavigation'
);

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
  private navigationItems: NavigationItems;

	constructor(@Inject(APP_NAVIGATION) navigation: NavigationItems) {
		this.setNavigation(navigation);
	}

	private setNavigation(definition: NavigationItems) {
		this.navigationItems = sortNestedByOrder(definition);
	}

	getNavigation() {
		return this.navigationItems;
  }

}
