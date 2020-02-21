import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { path } from 'ramda';

import { Configuration } from './configuration';
import { getConfigError, getInvalidConfigError } from './config-errors';
import { isNotUseable } from '@ngrx-beta-app/common';

export const CONFIG_URL = new InjectionToken('CONFIG_URL');

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	config: Configuration;

	constructor(
		@Inject(CONFIG_URL) private configUrl: string,
		private http: HttpClient
	) {}

	load() {
		return this.http
			.get<Configuration>(this.configUrl)
			.toPromise()
			.then(result => (this.config = result))
			.catch(() => {
				throw getConfigError(this.configUrl);
			});
	}

	getNgrxBetaAppApiUri() {
		if (isNotUseable(this.config)) throw getInvalidConfigError();

		return path(['apis', 'ngrxBetaApp'], this.config);
	}
}

export const appInitializer = (appConfig: ConfigService) => () =>
	appConfig.load();
