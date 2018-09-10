import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthStatusService } from './auth-status.service';

@Injectable()
export class AuthGuard implements CanActivate {
	private isLogged;
	constructor(
		private router: Router,
		private authStatus: AuthStatusService,
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> {
		return this.authStatus.isLoggedIn.pipe(
			take(1),
			map((isLoggedIn: boolean) => {
				if (this.authStatus.getUserToken()) {
					this.isLogged = this.authStatus.getUserToken().length
						? true
						: false;
				}
				if (this.isLogged) {
					this.authStatus.setIsLoggedInBasedOfRole();
					return true;
				}
				this.authStatus.setIsLoggedIn(false);
				this.router.navigate(['/login']);
				return false;
			}),
		);
	}
}
