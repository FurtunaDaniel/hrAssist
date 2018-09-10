import { Component, OnInit } from '@angular/core';
import { AuthStatusService } from '../../core/services';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
	displayNavbar$: Observable<boolean>;
	constructor(private authStatus: AuthStatusService) {}

	ngOnInit() {
		this.displayNavbar$ = this.authStatus.isAdminLoggedIn;
	}
}
