import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToggleCard } from '../../../shared';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DevicesService } from './devices.service';
import { UserService } from '../../services/user.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
	selector: 'app-user-devices',
	templateUrl: './user-devices.component.html',
	styleUrls: ['./user-devices.component.scss']
})
export class UserDevicesComponent implements OnInit, ToggleCard {
	/* Toggle Card Proprieties
	* these are required for each card
	*/
	public cardVisibilitySubject: Subject<any> = new Subject();
	public showForm: boolean;
	public isLoading: boolean;
	/*End Toggle Card Proprieties */

	public devices: any[];
	public viewDeviceMode: boolean;
	public userDevices: any[];
	public devicesToRemove: any[];
	deviceFormGroup: FormGroup;

	components: any[];

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	/* Mat Chip elements */
	@ViewChild('componentInput')
	componentInput: ElementRef;
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	componentsToAdd = [];
	constructor(
		translate: TranslateService,
		private devicesService: DevicesService,
		private userService: UserService
	) {
		this.viewDeviceMode = false;
		this.showForm = false;
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.setDefaultLang('en');
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use('en');

		this.deviceFormGroup = new FormGroup({
			device_name: new FormControl('', [
				Validators.required,
				Validators.pattern(`^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]+$`)
			]),
			serial_number: new FormControl('', [
				Validators.required,
				Validators.pattern(`^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]+$`)
			]),
			components: new FormControl([])
		});
	}

	ngOnInit(): void {
		this.devicesService.getAllComponents().subscribe(components => {
			this.components = components;
		});
		this.userService.getUserDevices().subscribe(devices => {
			this.userDevices = devices;
		});
	}
	public removeDevice(device, index): void {
		this.userDevices.splice(index, 1);
		this.devicesToRemove.push(device.device_id);
	}

	public viewDevice(device, index): void {
		this.devicesToRemove.push(device.device_id);
		this.viewDeviceMode = !this.viewDeviceMode;
		// this.deviceFormGroup.controls['device_name'].disabled();
		this.deviceFormGroup.controls['components'].setValue(device.components);
		this.deviceFormGroup.controls['device_name'].setValue(
			device.device_name
		);
		this.deviceFormGroup.controls['serial_number'].setValue(
			device.serial_number
		);

		this.componentsToAdd = device.components.map(item => item.name);
	}

	displayFn(device): string {
		return device && typeof device === 'object' ? device.name : device;
	}

	public onSubmit(event): void {
		event.preventDefault();
		this.deviceFormGroup.controls['components'].setValue(
			this.componentsToAdd
		);

		if (this.deviceFormGroup.valid || this.devicesToRemove.length) {
			if (
				this.devicesToRemove.length &&
				this.deviceFormGroup.controls['components'].value.length == 0
			) {
				/* check if are devices to remove but not to update */
				/* In this case will just remove the unwanted devices */
				this.userService
					.deleteUserDevices(this.devicesToRemove)
					.subscribe(data => {
						this.onToggle();
					});
			} else if (
				this.devicesToRemove.length &&
				this.deviceFormGroup.controls['components'].value.length
			) {
				/* check if are device to remove but also to update */
				this.userService
					.deleteUserDevices(this.devicesToRemove)
					.subscribe(deletedItems => {
						this.userService
							.updateUserDevice(this.deviceFormGroup.value)
							.subscribe(data => {
								this.userDevices = data.items;
								this.onToggle();
							});
					});
			} else if (this.deviceFormGroup.valid) {
				/* check if are device to update, and update the list */
				this.userService
					.updateUserDevice(this.deviceFormGroup.value)
					.subscribe(data => {
						this.userDevices = data.items;
						this.onToggle();
					});
			}
		}
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	/* Mat Chip elements */
	remove(component: any): void {
		const index = this.componentsToAdd.indexOf(component);
		if (index >= 0) {
			this.componentsToAdd.splice(index, 1);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.componentsToAdd.push(event.option.value.name);
		this.componentInput.nativeElement.value = '';
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	onToggle(event?): void {
		if (!event) {
			this.cardVisibilitySubject.next(this.showForm);
		} else {
			this.showForm = event.visible;
		}
		if (this.deviceFormGroup.controls['device_name'].valid) {
			this.deviceFormGroup.reset();
			this.componentsToAdd = [];
		}

		this.devicesToRemove = [];
	}
}
