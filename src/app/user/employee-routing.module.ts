import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { UserDetailsComponent } from './user-details';
import { UserListComponent } from '.';

const routes: Routes = [
	{
		path: '',
		component: UserListComponent,
		canActivate: [AuthGuard],
	},
	{
		path: ':id',
		component: UserDetailsComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule {}
