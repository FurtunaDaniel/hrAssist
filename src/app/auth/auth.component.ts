import { Component, OnInit } from '@angular/core';
import {
	UserLoginService,
	AuthentificatHelper,
	AuthStatusService,
} from '../core/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	public userFormGroup: FormGroup;
	errorMsg: string;

	private userToken = 'user_token';
	private authToken = 'auth_token';
	// @TODO this should be removed after development is done

	constructor(
		private userLoginService: UserLoginService,
		private translate: TranslateService,
		private authHelper: AuthentificatHelper,
		private authStatus: AuthStatusService,
		private router: Router,
	) {
		this.userFormGroup = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(
					'([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})',
				),
			]),
			password: new FormControl('', [Validators.required]),
		});

		// this language will be used as a fallback when a translation isn't found in the current language
		this.translate.setDefaultLang('en');
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		this.translate.use('en');
	}

	ngOnInit() {}

	public onSubmit(event): void {
		event.preventDefault();
		if (this.userFormGroup.valid) {
			this.userLoginService.login(this.userFormGroup.value).subscribe(
				data => {
					if (data.status === 'success') {
						localStorage.setItem(this.userToken, data.custom_token);

						// @TODO this should be removed after development is done
						localStorage.setItem(
							this.authToken,
							this.authHelper.getUserDecodedToken(
								data.custom_token,
							),
						);
						// this.router.navigate(['/employees/:id']);
						this.router.navigate([
							'/employees',
							this.authHelper.getUserId(data.custom_token),
						]);
						this.authStatus.setIsLoggedInBasedOfRole();
					}
					return data;
				},
				error => {
					this.errorMsg = error.error.message || 'Wrong credentials,';

					return error;
				},
			);
		}
	}
}
