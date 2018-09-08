import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { HolidayDetailsComponent } from './holiday-details/holiday-details.component';

const routes: Routes = [
	{
		path: '',
		component: HolidaysListComponent,
		canActivate: [AuthGuard],
	},
	{
		path: ':id',
		component: HolidayDetailsComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HolidayRoutingModule {}
