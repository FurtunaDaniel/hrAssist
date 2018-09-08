import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [
	{
		path: '',
		component: ProjectsListComponent,
		canActivate: [AuthGuard],
	},
	{
		path: ':id',
		component: ProjectDetailsComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProjectRoutingModule {}
