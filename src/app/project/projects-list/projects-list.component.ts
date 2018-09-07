import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ProjectService } from '../services/project.service';
import { MomentService } from '../../core/services';

@Component({
	selector: 'app-projects-list',
	templateUrl: './projects-list.component.html',
	styleUrls: ['./projects-list.component.scss']
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
		'action'
	];
	projects: any[];
	dataSource: MatTableDataSource<any>;
	isLoading: boolean;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private projectService: ProjectService,
		private ms: MomentService
	) {
		this.isLoading = true;
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
