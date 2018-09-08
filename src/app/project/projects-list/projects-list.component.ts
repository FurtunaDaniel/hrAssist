import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ProjectService } from '../services/project.service';
import { TranslateService } from '@ngx-translate/core';
import { MomentService } from '../../core/services';

@Component({
	selector: 'app-projects-list',
	templateUrl: './projects-list.component.html',
	styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
	displayedColumns = [
		'index',
		'name',
		'start_date',
		'end_date',
		'customer',
		'application_types',
		'industries',
		'users',
		'technologies',
		'action',
	];
	projects: any[];
	dataSource: MatTableDataSource<any>;
	isLoading: boolean;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private projectService: ProjectService,
		private ms: MomentService,
		translate: TranslateService,
	) {
		this.isLoading = true;
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.setDefaultLang('en');
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use('en');
	}

	ngOnInit() {
		this.getProjects();
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	private getProjects() {
		this.projectService.getAll().subscribe(projectsArray => {
			this.projects = projectsArray;
			this.isLoading = false;
			this.dataSource = new MatTableDataSource(this.projects);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}
}
