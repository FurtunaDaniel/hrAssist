import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatTableDataSource, MatPaginator, MatSort, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { MomentService } from '@app/core/services';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Moment } from 'moment';
import { ProjectService } from '@app/project/services';
import { Project } from '@app/project/models/project.model';
import { UserService } from '@app/user/services';
import { User } from '@app/user/models';
import { ToggleCard } from '@app/shared';
import { ModalComponent } from '@app/shared/modal/modal.component';

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
	/*End Toggle Card Proprieties */

	public invalidDates: boolean;
	public selectable = true;
	public removable = true;
	public $isSubmitted = false;
	public invalidInterval = false;
	public primary = 'primary';
	public users: User[];
	public teamLeaders: Array<User> = [];
	public projects: Project[];
	public holidays: Array<any> = [];
	private dateFormat = 'YYYY-MM-DD';
	public previousDate = this.ms.moment(new Date()).subtract(1, 'w');
	female = localStorage.getItem('female') ? true : false;
	/* Holiday Form */
	public holidayForm: FormGroup = new FormGroup({
		start_date: new FormControl(null, Validators.required),
		end_date: new FormControl(null, Validators.required),
		teamLeaders: new FormArray([], Validators.required),
		signing_day: new FormControl(this.ms.moment(), Validators.required),
		onGoingProjects: new FormArray([this.createItem()])
	});
	/* MAT Table varables */
	displayedColumns = ['index', 'start_date', 'end_date', 'days', 'project', 'action'];
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	/* Mat Chip elements */
	@ViewChild('chipInput') chipInput: ElementRef;
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	constructor(private userService: UserService, private ms: MomentService, private projectService: ProjectService, public dialog: MatDialog
	) { }

	ngOnInit() {
		this.showForm = false;
		this.isLoading = true;

		this.userService.getUserHolidays().subscribe(holidays => {
			this.holidays = holidays;
			this.dataSource = new MatTableDataSource(
				this.holidays,
			);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.isLoading = false;

		});

		this.userService.getUsers().subscribe(
			users => {
				this.users = users;
			}
		);

		this.projectService.getProjects().subscribe(
			projects => {
				this.projects = projects;
			}
		);
	}
	openDialog(item): void {
		const dialogRef = this.dialog.open(ModalComponent, {
			width: '450px',
			data: item
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.userService.deleteUserHolidays(result).subscribe(
					data => {
						this.holidays.splice(this.holidays.findIndex(holiday => holiday.holiday_id === data[0].id), 1);
						// this.dataSource = new MatTableDataSource(this.holidays);
					}
				);
			}
		});
	}

	public withoutWeekendDays = (todayMoment: Moment): boolean => {
		const day = todayMoment.day();
		// Prevent Saturday and Sunday from being selected.
		return day !== 0 && day !== 6;
	}

	get getTotalDays(): number {
		let totalDays = 0;
		this.holidays.forEach(element => {
			totalDays += element.days;
		});
		return totalDays;
	}

	public onSubmit(event): void {
		event.preventDefault();
		this.$isSubmitted = true;
		if (this.getDatesValidity && this.isIntervalValid && this.holidayForm.valid) {

			const projectIds = this.holidayForm.value.onGoingProjects.map(item =>
				item.project.id.toString()
			);
			const replacerIds = this.holidayForm.value.onGoingProjects.map(item =>
				item.replacer.id.toString()
			);
			const teamLeadersId = this.holidayForm.value.teamLeaders.map(item =>
				item.id.toString()
			);

			const holiday = {
				days: this.calculateHolidays(this.holidayForm.value.start_date, this.holidayForm.value.end_date),
				start_date: this.holidayForm.value.start_date.format(this.dateFormat),
				end_date: this.holidayForm.value.end_date.format(this.dateFormat),
				signing_day: this.holidayForm.value.signing_day.format(this.dateFormat),
				project_ids: projectIds,
				replacer_ids: replacerIds,
				user_id: 29,
				team_leader_ids: teamLeadersId
			};

			/* Save the holiday */
			this.userService
				.saveUserHoliday(holiday)
				.subscribe(data => {
					this.holidays.push(data);
					this.onToggle();
				});

			this.$isSubmitted = false;
		}
	}

	onToggle(event?): void {
		if (!event) {
			this.cardVisibilitySubject.next(this.showForm);
		} else {
			this.showForm = event.visible;
		}
		if (this.holidayForm.touched) {
			(this.holidayForm.get('teamLeaders') as FormArray).removeAt(0);
			(this.holidayForm.get('onGoingProjects') as FormArray).removeAt(1);
			this.holidayForm.reset();
			this.$isSubmitted = false;
			this.invalidDates = false;
			this.invalidInterval = false;
		}
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	/* Mat Chip elements */
	remove(index: number): void {
		(this.holidayForm.get('teamLeaders') as FormArray).removeAt(index);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.chipInput.nativeElement.value = '';
		(this.holidayForm.get('teamLeaders') as FormArray).push(
			new FormControl(event.option.value)
		);
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	/* Display project name in autocomplete */
	displayFn(project): string {
		return project && typeof project === 'object' ? project.name : project;
	}

	/* Display Full name of user in autocomplete */
	displayFullName(user): string {
		return user && typeof user === 'object' ? `${user.first_name} ${user.last_name}` : user;
	}

	/* Remove fields (autocomplete of projects and replacer) */
	public removeField(index): void {
		(this.holidayForm.get('onGoingProjects') as FormArray).removeAt(index);
	}

	/* Add more fields (autocomplete of projects and replacer) */
	public addFields(): void {
		(this.holidayForm.get('onGoingProjects') as FormArray).push(
			this.createItem()
		);
	}

	/**
	 * changeGender will set in localstorage the gender of user
	 * Important note: this change won't persist every login
	 */

	public changeGender() {

		if (!localStorage.getItem('female')) {
			localStorage.setItem('female', 'true');
			this.female = true;
		} else {
			localStorage.removeItem('female');
			this.female = false;
		}
	}

	/* Verify holiday date validity */
	get getDatesValidity(): boolean {

		const from = this.holidayForm.value.start_date;
		const to = this.holidayForm.value.end_date;
		const signingDate = this.holidayForm.value.signing_day;

		const datesAreSelected = (from != null && signingDate != null && to != null);
		if (datesAreSelected && signingDate <= from && from <= to) {
			this.invalidDates = false;
			return true;
		} if (datesAreSelected) {
			this.invalidDates = true;
			return false;
		}
	}

	/* Calculate the duration of an holiday */
	private calculateHolidays(dDate1: Moment, dDate2: Moment): number {
		let iWeeks = 0;
		let iDateDiff = 0;
		let iAdjust = 0;

		if (dDate2 < dDate1) {
			return -1;
		}

		let iWeekday1 = dDate1.day();
		let iWeekday2 = dDate2.day();

		iWeekday1 = (iWeekday1 === 0) ? 7 : iWeekday1;
		iWeekday2 = (iWeekday2 === 0) ? 7 : iWeekday2;

		if ((iWeekday1 > 5) && (iWeekday2 > 5)) {
			iAdjust = 1;
		}

		iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1;
		iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

		iWeeks = Math.floor((dDate2.valueOf() - dDate1.valueOf()) / 604800000);

		if (iWeekday1 <= iWeekday2) {
			iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1);
		} else {
			iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2);
		}
		iDateDiff -= iAdjust;

		return (iDateDiff + 1);
	}

	/* Check if this holiday interval already exist */
	private get isIntervalValid(): boolean {
		if (this.holidays.length) {
			const toSaveStartDate = this.holidayForm.value.start_date.format(this.dateFormat);
			const toSaveEndDate = this.holidayForm.value.end_date.format(this.dateFormat);

			for (let i = 0; i < this.holidays.length; i++) {
				if ((toSaveStartDate <= this.holidays[i].end_date) && (this.holidays[i].start_date <= toSaveEndDate)) {
					this.invalidInterval = true;
					break;
				}
			}
			if (!this.invalidInterval) {
				return true;
			}
		} else {
			return true;
		}
	}

	/* 	Create form group for onGoingProjets form array */
	private createItem(): FormGroup {
		return new FormGroup({
			project: new FormControl(null),
			replacer: new FormControl(null),
		});
	}

}
