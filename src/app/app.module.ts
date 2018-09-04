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

export function HttpLoaderFactory(handler: HttpBackend) {
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
				useFactory: HttpLoaderFactory,
				deps: [HttpBackend]
			}
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
