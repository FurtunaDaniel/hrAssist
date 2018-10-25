import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { MatDialog } from '@angular/material';

import { MomentService } from '@app/core';
import { UserService } from '@app/user/services';
import { HolidayService } from '../services/holiday.service';
import { HolidayModalComponent } from '../holiday-modal/holiday-modal.component';

@Component({
	selector: 'app-holidays-calendar',
	templateUrl: './holidays-calendar.component.html',
	styleUrls: ['./holidays-calendar.component.scss']
})

export class HolidaysCalendarComponent implements OnInit {
	calendarOptions: any;
	displayEvent: any;
	holidays: Array<any> = [];
	isLoading: boolean;

	@ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
	constructor(private holidayService: HolidayService,
		private userService: UserService, public dialog: MatDialog, private ms: MomentService) {

	}

	ngOnInit() {
		this.getHolidays();
		this.isLoading = true;
	}

	clickButton(model: any) {
		this.displayEvent = model;
	}
	/* @TODO Next DAY Finish this function */
	eventClick(model: any) {
		// tslint:disable-next-line:no-parameter-reassignment
		model = {
			event: {
				id: model.event.id,
				start: this.ms.moment(model.event.start).format('MMMM Do'),
				end: this.ms.moment(model.event.end).format('LL'),
				title: model.event.title,
				allDay: model.event.allDay,
				signingDate: this.ms.moment(model.event.signingDate).format('LL'),
				days: model.event.days
			},
			duration: {}
		};
		this.displayEvent = model;

		const dialogRef = this.dialog.open(HolidayModalComponent, {
			width: '450px',
			data: model.event
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		});

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
										title: `${userfound.first_name} ${
											userfound.last_name
											}`,
										start: holiday.start_date,
										end: this.ms.moment(holiday.end_date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD'),
										days: holiday.days,
										id: holiday.holiday_id,
										signingDate: holiday.signing_day,
										stick: true

									});
								}
							});
						}
						if (this.holidays) {
							this.isLoading = false;

							this.calendarOptions = {
								editable: false,
								eventLimit: false,
								weekends: false,
								header: {
									left: 'prev,next',
									center: 'title',
									right: ''
								},
								events: this.holidays
							};

						}
					},
					usersError => {
						console.warn(usersError);
					},
				);
			},
			holidaysError => {
				console.warn(holidaysError);
			},
		);
	}

}
