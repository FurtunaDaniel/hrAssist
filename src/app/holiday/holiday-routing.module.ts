import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { AuthGuard } from '@app/core/services';
import { HolidaysListComponent, HolidayDetailsComponent } from '.';
import { HolidaysCalendarComponent } from './holidays-calendar/holidays-calendar.component';

const routes: Routes = [
	{
		path: 'calendar',
		component: HolidaysCalendarComponent,
		canActivate: [AuthGuard],
	}, {
		path: ':id',
		component: HolidayDetailsComponent,
		canActivate: [AuthGuard],
	},
	{
		path: '',
		component: HolidaysListComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HolidayRoutingModule { }
