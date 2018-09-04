import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HolidayService } from '../services/holiday.service';
import { UserService } from '../../user/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
	selector: 'app-holidays-list',
	templateUrl: './holidays-list.component.html',
	styleUrls: ['./holidays-list.component.scss']
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
		'action'
	];
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;

	constructor(
		private holidayService: HolidayService,
		private userService: UserService,
		@Inject('moment') private moment,
		translate: TranslateService
	) {
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.setDefaultLang('en');
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use('en');
	}

	ngOnInit() {
		this.isLoading = true;
		this.getHolidays();
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		debugger;

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
										employee:
											userfound.first_name +
											' ' +
											userfound.last_name,
										signing_day: holiday.signing_day,
										start_date: holiday.start_date,
										end_date: holiday.end_date,
										days: holiday.days,
										id: holiday.holiday_id
									});
								}
							});
						}
						if (this.holidays) {
							this.isLoading = false;
							this.dataSource = new MatTableDataSource(
								this.holidays
							);
							this.dataSource.paginator = this.paginator;
							this.dataSource.sort = this.sort;
						}
					},
					usersError => {
						console.error(usersError);
					}
				);
			},
			holidaysError => {
				console.error(holidaysError);
			}
		);
	}
}
