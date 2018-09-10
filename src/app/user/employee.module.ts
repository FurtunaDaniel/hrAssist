import { NgModule } from '@angular/core';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
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
	UserCoursesCertificationsComponent,
	DevicesService,
	LangaugesService
} from './user-details';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared';
import { UserService } from './services/user.service';

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
	providers: [UserService, LangaugesService, DevicesService]
})
export class UserModule {}
