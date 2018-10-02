import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthentificatHelper, AuthStatusService } from '@app/core/services';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authHelper: AuthentificatHelper,
		private authStatus: AuthStatusService,
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> {
		return this.authStatus.isLoggedIn.pipe(
			take(1),
			map((isLoggedIn: boolean) => {
				if (!this.authStatus.getUserToken()) {
					this.authStatus.setIsLoggedIn(false);
					return true;
				}
				this.authStatus.setIsLoggedInBasedOfRole();
				this.router.navigate([
					'/employees',
					this.authHelper.getUserId(this.authStatus.getUserToken()),
				]);
				return false;
			}),
		);
	}
}
