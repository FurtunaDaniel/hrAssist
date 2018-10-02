import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { UserService } from '@app/user/services';
@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
	displayedColumns = [
		'index',
		'first_name',
		'languages',
		'certifications',
		'projects',
		'technologies',
		'action',
	];
	users: any[];
	dataSource: MatTableDataSource<any>;
	isLoading: boolean;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private userService: UserService) {
		this.isLoading = true;
	}

	ngOnInit() {
		this.getUsers();
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	private getUsers() {
		this.userService.getAll().subscribe(usersArray => {
			this.users = usersArray;
			this.isLoading = false;
			this.dataSource = new MatTableDataSource(this.users);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}
}
