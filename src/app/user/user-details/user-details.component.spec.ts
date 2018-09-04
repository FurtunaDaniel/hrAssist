import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { UserGeneralComponent } from './user-general/user-general.component';
import { UserLanguagesComponent } from './user-languages/user-languages.component';
import { UserDevicesComponent } from './user-devices/user-devices.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {
	MatInputModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatTableModule,
	MatListModule,
	MatIconModule,
	MatPaginatorModule,
	MatCardModule,
	MatTooltipModule,
	MatDatepickerModule,
	MatSelectModule,
	MatButtonModule,
	MatAutocompleteModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FilterArrayPipe } from '../../shared/autocomplete.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificatHelper } from '../../core/services';
describe('UserDetailsComponent', () => {
	let component: UserDetailsComponent;
	let fixture: ComponentFixture<UserDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				MatInputModule,
				MatProgressSpinnerModule,
				MatProgressBarModule,
				MatTableModule,
				MatListModule,
				MatIconModule,
				MatPaginatorModule,
				MatCardModule,
				MatTooltipModule,
				FormsModule,
				ReactiveFormsModule,
				MatDatepickerModule,
				MatSelectModule,
				FlexLayoutModule,
				MatButtonModule,
				NgbModule,
				MatAutocompleteModule
			],
			providers: [HttpClient, HttpHandler, AuthentificatHelper],
			declarations: [
				UserDetailsComponent,
				UserGeneralComponent,
				UserLanguagesComponent,
				UserDevicesComponent,

				FilterArrayPipe
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
