import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
	AuthentificatHelper,
	UserLoginService,
	AuthGuard,
	AuthStatusService,
	ApiService,
	MomentService
} from './services';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	providers: [
		AuthentificatHelper,
		UserLoginService,
		AuthGuard,
		ApiService,
		AuthStatusService,
		MomentService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpTokenInterceptor,
			multi: true
		}
	],
	declarations: []
})
export class CoreModule {}
