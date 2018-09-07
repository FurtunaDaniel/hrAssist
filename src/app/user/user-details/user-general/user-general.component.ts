import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subject } from 'rxjs/Subject';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { ToggleCard } from '../../../shared';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { PositionService } from '../../services/position.service';
import { GravatarService } from '@infinitycube/gravatar';

import * as _ from 'lodash';
@Component({
	selector: 'app-user-general',
	templateUrl: './user-general.component.html',
	styleUrls: ['./user-general.component.scss'],
	providers: [PositionService, GravatarService]
})
export class UserGeneralComponent implements OnInit, ToggleCard {
	user: User;
	/* cardVisibilitySubject notify to childrens that showForm value was changed */
	public cardVisibilitySubject: Subject<any> = new Subject();

	public isLoading: boolean;
	public showForm: boolean;
	public showSsh: boolean;
	public toggleSshLabel: string;
	public generalInfoForm: FormGroup;
	private alertMsg = {
		show: <boolean>false,
		message: <string>'',
		type: <string>''
	};
	public gravatarUrl: string;
	public today: Date;
	public positions: any[];
	public userPosition: any;

	private dateFormat: string;
	private initialUserObj: User;

	contractType = ['Full-time', 'Part-time 4h', 'Part-time 6h'];

	constructor(
		private userService: UserService,
		private positionService: PositionService,
		private gravatar: GravatarService
	) {
		this.isLoading = true;
		this.showForm = false;
		this.showSsh = false;
		this.toggleSshLabel = 'Show';
		this.dateFormat = 'YYYY-MM-DD';
		this.alertMsg.show = false;
		this.alertMsg.message = ``;
		this.today = new Date();

		// default userPosition
		this.userPosition = {
			id: 0,
			name: '',
			job_detail: null
		};
	}

	ngOnInit() {
		this.getUserGeneralInfo().subscribe(userJson => {
			if (userJson) {
				this.user = userJson;

				this.gravatarUrl = this.gravatar.url(
					this.user.email,
					128,
					'wavatar'
				);

				// Create GeneralInfo Form
				this.generalInfoForm = new FormGroup({
					// tslint:disable-next-line

					first_name: new FormControl(this.user.first_name || '', [
						Validators.required,
						Validators.pattern(`^[a-zA-Z ,.'-]+$`)
					]),
					middle_name: new FormControl(this.user.middle_name || '', [
						Validators.pattern(`^[a-zA-Z ,.'-]+$`)
					]),

					last_name: new FormControl(this.user.last_name || '', [
						Validators.required,
						Validators.pattern(`^[a-zA-Z ,.'-]+$`)
					]),
					birthday: new FormControl(this.user.birthday || null),
					company_start_date: new FormControl(
						this.user.company_start_date || null
					),
					cnp: new FormControl(this.user.cnp || '', [
						Validators.pattern(`^[0-9]{13}`)
					]),
					city: new FormControl(this.user.city || ''),
					zip_code: new FormControl(this.user.zip_code || ''),
					address: new FormControl(this.user.address || ''),
					phone: new FormControl(this.user.phone || null),
					other_email: new FormControl(
						this.user.other_email || null,
						[
							Validators.pattern(
								// tslint:disable-next-line:max-line-length
								`^[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`
							)
						]
					),
					car_plate: new FormControl(this.user.car_plate || ''),

					office_nr: new FormControl(this.user.office_nr || ''),
					work_info: new FormGroup({
						ssh_public_key: new FormControl(
							this.user.work_info
								? this.user.work_info.ssh_public_key
								: ''
						),
						bitbucket: new FormControl(
							this.user.work_info
								? this.user.work_info.bitbucket
								: ''
						),
						github: new FormControl(
							this.user.work_info
								? this.user.work_info.github
								: ''
						)
					}),

					urgent_contact_name: new FormControl(
						this.user.urgent_contact_name || null
					),
					urgent_contact_phone: new FormControl(
						this.user.urgent_contact_phone || null
					)
				});

				// save value init value of user for later comparison
				this.initialUserObj = _.cloneDeep(this.generalInfoForm.value);

				this.isLoading = false;
			}
		});

		this.positionService.getPositions().subscribe(positions => {
			this.positions = positions;
		});

		this.userService.getUserPosition().subscribe(userPosition => {
			this.userPosition = userPosition;
		});
	}
	public logout() {
		localStorage.clear();
		window.location.reload();
	}

	// Because of momentjs in "ngModel" is passed a Moment object
	// and need to be converted to accepted format of API
	public formatDate(model: string, event: MatDatepickerInputEvent<any>) {
		this.user[model] = event.value.format(this.dateFormat);
	}

	public onToggle(event?): void {
		if (!event) {
			// notify the value of showForm
			this.cardVisibilitySubject.next(this.showForm);
		} else {
			this.showForm = event.visible;
		}
		if (!_.isEqual(this.user, this.initialUserObj)) {
			this.user = _.cloneDeep(this.initialUserObj);
		}
	}

	public toggleViewSsh() {
		this.showSsh = !this.showSsh;
		this.toggleSshLabel = this.showSsh
			? 'Hide Public SSH key'
			: 'Show Public SSH key';
	}

	onSubmit(userForm): void {
		if (this.generalInfoForm.valid) {
			if (!_.isEqual(userForm.value, this.initialUserObj)) {
				this.userService
					.updateUserInfo(userForm.value)
					.subscribe(updatedUser => {
						// reinit initialUserObj with new saved value/
						this.initialUserObj = _.cloneDeep(userForm.value);
						this.showAlert(
							`Your informations was saved`,
							'success',
							true,
							3000
						);
					});
			} else {
				this.showAlert(
					`Your Didn't change any field`,
					'info',
					true,
					3000
				);
			}
		} else {
			this.showAlert(`Your have some errors!`, 'warning', false);
		}
	}
	public savePosition(position) {
		this.userService
			.updateUserPosition({
				position_id: position.id
			})
			.subscribe(data => {
				this.userPosition = data;
			});
	}

	// @TODO Need a better approch like a service
	private showAlert(
		message: string,
		type?: string,
		toggle?: boolean,
		time?: number
	) {
		type = type ? type : 'success';
		time = time ? time : 0;
		toggle = toggle ? toggle : false;

		this.alertMsg.show = true;
		this.alertMsg.message = message;
		this.alertMsg.type = type;
		if (toggle && time) {
			setTimeout(() => {
				this.onToggle();
				this.alertMsg.show = !this.alertMsg.show;
			}, time);
		}
		if (time && !toggle) {
			setTimeout(() => {
				this.alertMsg.show = !this.alertMsg.show;
			}, time);
		}
	}

	private getUserGeneralInfo() {
		return this.userService.getUserInfo();
	}
}
