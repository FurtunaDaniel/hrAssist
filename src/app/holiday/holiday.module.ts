import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { HttpTokenInterceptor } from '../core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { HolidayDetailsComponent } from './holiday-details/holiday-details.component';
import { HolidayRoutingModule } from './holiday-routing.module';
import { HolidayService } from './services/holiday.service';
import { UserService } from '../user/services/user.service';

// BrowserAnimationsModule
@NgModule({
	imports: [SharedModule, HolidayRoutingModule],
	declarations: [HolidaysListComponent, HolidayDetailsComponent],
	providers: [
		HolidayService,
		UserService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpTokenInterceptor,
			multi: true
		}
	]
})
export class HolidayModule {}
