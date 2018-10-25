import { NgModule } from '@angular/core';
import { FullCalendarModule } from 'ng-fullcalendar';
// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06

import { SharedModule } from '../shared';
import { HolidayRoutingModule } from './holiday-routing.module';
import { UserService } from '../user/services/user.service';
import {
	HolidaysListComponent,
	HolidayDetailsComponent,
	HolidayService,
	HolidaysCalendarComponent,
	HolidayModalComponent
} from '.';

@NgModule({
	imports: [SharedModule, HolidayRoutingModule, FullCalendarModule],
	entryComponents: [HolidayModalComponent],
	declarations: [HolidaysListComponent, HolidayDetailsComponent, HolidaysCalendarComponent, HolidayModalComponent],
	providers: [HolidayService, UserService]

})
export class HolidayModule { }
