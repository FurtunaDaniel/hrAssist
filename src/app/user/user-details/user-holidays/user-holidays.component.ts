import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UserService } from '@app/user/services';
import { ToggleCard } from '@app/shared';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { MomentService } from '@app/core/services';
import { FormGroup, FormControl } from '@angular/forms';
import { Moment } from 'moment';

@Component({
	selector: 'app-user-holidays',
	templateUrl: './user-holidays.component.html',
	styleUrls: ['./user-holidays.component.scss'],
})
export class UserHolidaysComponent implements OnInit, ToggleCard {
	/* Toggle Card Proprieties
	* these are required for each card
	*/
	public cardVisibilitySubject: Subject<any> = new Subject();
	public showForm: boolean;
	public isLoading: boolean;
	public holiday: any;
	public holidayForm: FormGroup;

	/*End Toggle Card Proprieties */
	displayedColumns = ['index', 'start_date', 'end_date', 'days', 'project', 'action'];
	public holidays: Array<any> = [];
	private dateFormat = 'YYYY-MM-DD';
	public lastMonth;

	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private userService: UserService, private ms: MomentService) {
		this.showForm = false;
		// this.isLoading = true;
		this.lastMonth = ms.moment(new Date()).subtract(1, 'M');
	}

	ngOnInit() {
		this.userService.getUserHolidays().subscribe(holidays => {
			this.holidays = holidays;
			console.log(holidays);
			this.dataSource = new MatTableDataSource(
				this.holidays,
			);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.isLoading = false;
		});

		this.holidayForm = new FormGroup({
			start_date: new FormControl(null),
			end_date: new FormControl(null),
			signing_day: new FormControl(null)
		});
	}
	// Because of momentjs in "ngModel" is passed a Moment object
	// and need to be converted to accepted format of API
	public formatDate(model: string, event: MatDatepickerInputEvent<any>) {
		// this.holiday[model] = event.value.format(this.dateFormat);
	}

	public withoutWeekendDays = (d: Moment): boolean => {
		// debugger
		const day = d.day();
		// Prevent Saturday and Sunday from being selected.
		return day !== 0 && day !== 6;
	}

	get getTotalDays(): number {
		let totalDays = 0;
		this.holidays.forEach((element, index) => {
			totalDays += element.days;
		});
		return totalDays;
	}

	onToggle(event?): void {
		if (!event) {
			this.cardVisibilitySubject.next(this.showForm);
		} else {
			this.showForm = event.visible;
		}
		// if (this.deviceFormGroup.get('device_name').valid) {
		// 	this.deviceFormGroup.reset();
		// 	this.componentsToAdd = [];
		// }

		// this.devicesToRemove = [];
	}

}
