import { NgModule } from '@angular/core';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { SharedModule } from '../shared';
import { ProjectRoutingModule } from './project-routing.module';

import {
	ProjectsListComponent,
	ProjectDetailsComponent,
	ProjectService
} from '.';
@NgModule({
	imports: [SharedModule, ProjectRoutingModule],
	declarations: [ProjectsListComponent, ProjectDetailsComponent],
	providers: [ProjectService]
})
export class ProjectModule {}
