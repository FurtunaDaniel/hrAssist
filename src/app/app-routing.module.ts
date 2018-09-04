import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { UserListComponent, UserDetailsComponent } from './user';
import { AuthGuard } from './core/services';
const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'employees',
		canActivate: [AuthGuard],
		loadChildren: 'app/user/employee.module#UserModule'
		/* Lazy Load Module */
	},
	{
		path: 'projects',
		canActivate: [AuthGuard],
		loadChildren: 'app/project/project.module#ProjectModule'
		/* Lazy Load Module */
	},
	{
		path: 'holidays',
		canActivate: [AuthGuard],
		loadChildren: 'app/holiday/holiday.module#HolidayModule'
		/* Lazy Load Module */
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			// preload all modules; optionally we could
			// implement a custom preloading strategy for just some
			// of the modules (PRs welcome 😉)
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
