import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { HolidayService } from '../services/holiday.service';
import { MomentService } from '@app/core/services';
import { UserService } from '@app/user/services';

@Component({
	selector: 'app-holidays-list',
	templateUrl: './holidays-list.component.html',
	styleUrls: ['./holidays-list.component.scss'],
})
export class HolidaysListComponent implements OnInit {
	holidays: Array<any> = [];
	isLoading: boolean;
	displayedColumns = [
		'index',
		'employee',
		'start_date',
		'end_date',
		'days',
		'signing_day',
		'action',
	];
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private holidayService: HolidayService,
		private userService: UserService,

		private ms: MomentService
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.getHolidays();
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	private getHolidays(): void {
		this.holidayService.getAll().subscribe(
			holidays => {
				this.userService.getUsers().subscribe(
					users => {
						if (holidays) {
							/* Iterate through holidays array and return objects with full name of the user */

							holidays.forEach(holiday => {
								const userfound = users.find(user => {
									/* When will find a match will return it and stop searching */
									return user.id == holiday.user_id;
								});

								if (userfound) {
									this.holidays.push({
										employee: `${userfound.first_name} ${
											userfound.last_name
										}`,
										signing_day: holiday.signing_day,
										start_date: holiday.start_date,
										end_date: holiday.end_date,
										days: holiday.days,
										id: holiday.holiday_id,
									});
								}
							});
						}
						if (this.holidays) {
							this.isLoading = false;
							this.dataSource = new MatTableDataSource(
								this.holidays,
							);
							this.dataSource.paginator = this.paginator;
							this.dataSource.sort = this.sort;
						}
					},
					usersError => {
						console.error(usersError);
					},
				);
			},
			holidaysError => {
				console.error(holidaysError);
			},
		);
	}
}
