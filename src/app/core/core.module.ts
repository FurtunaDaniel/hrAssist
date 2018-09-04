import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
	AuthentificatHelper,
	UserLoginService,
	AuthGuard,
	AuthStatusService
} from './services';
import { ApiService } from './services/api.service';

@NgModule({
	imports: [CommonModule],
	providers: [
		AuthentificatHelper,
		UserLoginService,
		AuthGuard,
		ApiService,
		AuthStatusService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpTokenInterceptor,
			multi: true
		}
	],
	declarations: []
})
export class CoreModule {}
