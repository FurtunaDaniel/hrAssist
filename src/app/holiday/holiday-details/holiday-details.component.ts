import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../services/holiday.service';
import { UserService } from '@app/user/services';

@Component({
	selector: 'app-holiday-details',
	templateUrl: './holiday-details.component.html',
	styleUrls: ['./holiday-details.component.scss'],
})
export class HolidayDetailsComponent implements OnInit {
	public holiday;
	public holidayPaper;

	constructor(private holidayService: HolidayService, private userService: UserService) {
	}

	ngOnInit() {
		this.holidayService.getHoliday().subscribe(
			holiday => {
				this.holiday = holiday;
				const holidayLeaders = [];
				holiday.employee_replacements.forEach(item => {
					if (item.team_leader) {
						holidayLeaders.push(item.team_leader);
					}
				});
				this.userService.getUsers().subscribe(employees => {
					const userfound = employees.find(employee => {
						/* When will find a match will return it and stop searching */
						return employee.id == holiday.user_id;
					});
					if (userfound) {
						this.holidayPaper = {
							firstName: userfound.first_name,
							lastName: userfound.last_name,
							holidays: holiday.days,
							signing: holiday.signing_day,
							startDate: holiday.start_date,
							endDate: holiday.end_date,
							holidayRep: holiday.employee_replacements,
							leaders: holidayLeaders,
							employee: `${userfound.first_name} ${
								userfound.last_name
								}`,
							signing_day: holiday.signing_day,
							start_date: holiday.start_date,
							end_date: holiday.end_date,
							days: holiday.days,
							id: holiday.holiday_id,
							isFemale: localStorage.getItem('female')
						};
					}

				});

			}
		);

	}

	print() {
		window.print();
	}

}
