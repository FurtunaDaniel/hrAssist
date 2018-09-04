import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { UserLoginService, HttpTokenInterceptor } from '../core';

import { EmployeeRoutingModule } from './employee-routing.module';
import {
	UserDetailsComponent,
	UserGeneralComponent,
	UserLanguagesComponent,
	UserDevicesComponent,
	UserHolidaysComponent,
	UserScheduleComponent,
	UserProjectsComponent,
	UserTechnologiesComponent,
	UserEducationComponent,
	UserCoursesCertificationsComponent
} from './user-details';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { LangaugeService } from './user-details/user-languages/langauge.service';
import { UserListComponent } from './user-list/user-list.component';
import { DevicesService } from './user-details/user-devices/devices.service';

// BrowserAnimationsModule
@NgModule({
	imports: [SharedModule, EmployeeRoutingModule],
	declarations: [
		UserListComponent,
		UserDetailsComponent,
		UserGeneralComponent,
		UserLanguagesComponent,
		UserDevicesComponent,
		UserHolidaysComponent,
		UserScheduleComponent,
		UserProjectsComponent,
		UserTechnologiesComponent,
		UserEducationComponent,
		UserCoursesCertificationsComponent
	],
	providers: [
		UserLoginService,
		UserService,
		LangaugeService,
		DevicesService,

		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpTokenInterceptor,
			multi: true
		}
	]
})
export class UserModule {}
