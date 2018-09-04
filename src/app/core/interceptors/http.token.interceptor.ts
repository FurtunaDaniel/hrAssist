import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthentificatHelper, AuthStatusService } from '../services';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
	authToken: string;
	userToken: string;

	constructor(
		private authHelper: AuthentificatHelper,
		private authStatus: AuthStatusService
	) {
		this.userToken = this.authStatus.getUserToken();
		if (this.userToken) {
			this.authToken = this.authHelper.getUserDecodedToken(
				this.userToken
			);
		}
	}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// Clone the request to add the new header.
		const authReq = req.clone({
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				token: this.authToken
			})
		});
		// send the newly created request
		return next.handle(authReq).pipe(
			map(event => {
				return event;
			}),
			catchError(errorResponse => {

				if (
					errorResponse.error.error == '400 Invalid Token' ||
					errorResponse.error.error == '400 Token Expired'
				) {
					localStorage.clear();
					setTimeout(() => {
						window.location.reload();
					});
				}
				if (errorResponse.error.error == '401 Access Denied') {
					// Need a better aproch here about route's where some role doesn't have access
					window.history.back();
				}
				return throwError(errorResponse);
			})
		);
	}
}
