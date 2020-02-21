import { ShellComponent } from '@ngrx-beta-app/core';

export const ApplicationRoutes = [
	{
		path: '',
		component: ShellComponent,
		children: [
			{
				path: '',
				loadChildren: '@ngrx-beta-app/dashboarding#DashboardingModule'
			},
			{
				path: '',
				loadChildren: '@ngrx-beta-app/activity-log#ActivityLogModule'
			},
			{
				path: '',
				loadChildren: '@ngrx-beta-app/notifications#NotificationsModule'
			},
			{
				path: '',
				loadChildren: '@ngrx-beta-app/clients#ClientsModule'
			},
			{
				path: '',
				loadChildren: '@ngrx-beta-app/content#ContentModule'
      },
      {
				path: '',
        loadChildren: '@ngrx-beta-app/notes#NotesModule',
      },
      {
				path: '',
        loadChildren: '@ngrx-beta-app/events#EventsModule',
			}
		]
	}
];
