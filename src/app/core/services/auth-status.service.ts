import { Injectable } from '@angular/core';
import {
	Router,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthentificatHelper } from './AuthentificationHelper.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthStatusService {
	private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false,
	);
	private adminLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<
		boolean
	>(false);
	userToken: string;

	get isLoggedIn() {
		return this.loggedIn.asObservable();
	}
	get isAdminLoggedIn() {
		return this.adminLoggedIn.asObservable();
	}

	constructor(private authHelper: AuthentificatHelper) {}

	setIsLoggedIn(status) {
		this.loggedIn.next(status);
	}
	setIsAdminLoggedIn(status) {
		this.adminLoggedIn.next(status);
	}

	getLoggedInStatus() {
		return this.loggedIn.asObservable();
	}
	getUserToken(): string {
		return (this.userToken = localStorage['user_token']);
	}
	setIsLoggedInBasedOfRole() {
		if (this.authHelper.getUserRole(this.getUserToken()) === 1) {
			this.setIsAdminLoggedIn(true);
		} else {
			this.setIsAdminLoggedIn(false);
		}
	}
}
