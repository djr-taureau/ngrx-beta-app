import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationItems } from '@ngrx-beta-app/';
import { NavigationService } from '../../services';

@Component({
	selector: 'lw-app-navigation',
	templateUrl: './app-navigation.component.html',
	styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent implements OnInit {
	navigation: NavigationItems;

	constructor(
    private router: Router,
    private route: ActivatedRoute,
		private navigationService: NavigationService
	) {}

	ngOnInit() {
    this.navigation = this.navigationService.getNavigation();
	}

	raiseEvent($event: MouseEvent, action: string) {
    switch (action) {
			case 'logout':
				this.logout();
        break;
      case 'addNote':
        this.router.navigate(['addNote']);
      break;
      case 'addTodo':
        this.router.navigate(['addTodo']);
      break;
      }
  }

	logout() {
		// this.auth.logout();
  }

}
