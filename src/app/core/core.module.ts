import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import {
	AuthentificatHelper,
	AuthGuard,
	AuthStatusService,
	ApiService,
	MomentService
} from './services';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	providers: [
		AuthentificatHelper,
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
