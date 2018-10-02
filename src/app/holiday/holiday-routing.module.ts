import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { AuthGuard } from '@app/core/services';
import { HolidaysListComponent, HolidayDetailsComponent } from '.';

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
