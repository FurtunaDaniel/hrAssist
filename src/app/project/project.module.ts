import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { HttpTokenInterceptor } from '../core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectService } from './services/project.service';

// BrowserAnimationsModule
@NgModule({
	imports: [SharedModule, ProjectRoutingModule],
	declarations: [ProjectsListComponent, ProjectDetailsComponent],
	providers: [
		ProjectService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpTokenInterceptor,
			multi: true,
		},
	],
})
export class ProjectModule {}
