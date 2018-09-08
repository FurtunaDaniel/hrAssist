import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavBarComponent, SharedModule } from './shared';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function httpLoaderFactory(handler: HttpBackend) {
	// return new TranslateHttpLoader(http, 'assets/i18n', '-lang.json');
	/* above code if I have want a custom path for translation */
	const http = new HttpClient(handler);

	return new TranslateHttpLoader(http, './assets/i18n/', '-lang.json');
}

@NgModule({
	declarations: [AppComponent, NavBarComponent],

	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		SharedModule,
		AuthModule,
		AppRoutingModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory,
				deps: [HttpBackend],
			},
		}),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
