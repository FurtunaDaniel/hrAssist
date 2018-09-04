import { Injectable } from '@angular/core';

@Injectable()
export class AuthentificatHelper {
	constructor() {}

	private decodeToken(token) {
		if (token) {
			let base64 = '';
			base64 = token
				.split('.')[1]
				.replace('-', '+')
				.replace('_', '/');

			return JSON.parse(window.atob(base64));
		}
	}

	getUserDecodedToken(token) {
		if (token) {
			return this.decodeToken(token).token;
		} else {
			console.error('Token missing');
			return null;
		}
	}

	getUserId(token) {
		return this.decodeToken(token).user_id;
	}

	getUserRole(token) {
		return this.decodeToken(token).role_id;
	}
	getUserLoginStatus() {
		return localStorage.getItem('user_token') ? true : false;
	}
}
