import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthStatusService } from './auth-status.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authStatus: AuthStatusService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		return this.authStatus.isLoggedIn.pipe(
			take(1),
			map((isLoggedIn: boolean) => {
				if (this.authStatus.getUserToken()) {
					isLoggedIn = this.authStatus.getUserToken().length
						? true
						: false;
				}
				if (isLoggedIn) {
					this.authStatus.setIsLoggedInBasedOfRole();
					return true;
				} else {
					this.authStatus.setIsLoggedIn(false);
					this.router.navigate(['/login']);
					return false;
				}
			})
		);
	}
}
