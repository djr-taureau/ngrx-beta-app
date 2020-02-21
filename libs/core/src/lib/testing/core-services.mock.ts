import { ConfigService } from '../services';
import { AuthService } from '@ngrx-beta-app/authentication';

export const AuthServiceMock = jasmine.createSpyObj<AuthService>(
	'AuthService',
	['login', 'getToken', 'isAuthenticated', 'logout']
);

export const ConfigServiceMock = jasmine.createSpyObj<ConfigService>(
	'ConfigService',
	['load', 'getngrx-beta-appApiUri']
);
