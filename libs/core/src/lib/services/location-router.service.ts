import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable({
	providedIn: 'root'
})
export class LocationRouterService {
	constructor() {}

	getURL(GUID: string, contentType: string) {
		return '/';
	}

	getAction(GUID: string, contentType: string): Action {
		return { type: 'goToRoute' };
	}
}
