import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
	MatButtonModule,
	MatMenuModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatAutocompleteModule,
	MatButtonToggleModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatInputModule,
	MatListModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatTooltipModule,
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
	MatDialogModule,
	MatProgressSpinnerModule,
} from '@angular/material';
// import {  MatDialogModule } from '@angular/material/dialog';

import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
	parse: {
		dateInput: 'YYYY-MMM-DD',
	},
	display: {
		dateInput: 'DD/MMM/YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

import { FlexLayoutModule } from '@angular/flex-layout';
import { GravatarModule } from '@infinitycube/gravatar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToggleButtonComponent } from './toggle-button';
import { FilterArrayPipe } from '@app/shared/autocomplete-pipe/autocomplete.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
@NgModule({
	imports: [
		MatDialogModule,
		CommonModule,
		RouterModule,
		HttpClientModule,
		MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatAutocompleteModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatInputModule,
		MatListModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatStepperModule,
		MatTableModule,
		MatTabsModule,
		MatTooltipModule,
		FlexLayoutModule,
		GravatarModule,
		TranslateModule,
		NgbModule.forRoot(),
	],
	entryComponents: [ModalComponent],
	declarations: [ToggleButtonComponent, FilterArrayPipe, SpinnerComponent, CardComponent, ModalComponent],
	exports: [
		CommonModule,
		FilterArrayPipe,
		ToggleButtonComponent,
		RouterModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatAutocompleteModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatInputModule,
		MatListModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatStepperModule,
		MatTableModule,
		MatTabsModule,
		MatTooltipModule,
		FlexLayoutModule,
		GravatarModule,
		NgbModule,
		TranslateModule,
		SpinnerComponent,
		CardComponent,
		ModalComponent,
	],
	providers: [
		// `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
		// application's root module. We provide it at the component level here, due to limitations of
		// our example generation script.
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},

		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	],
})
export class SharedModule { }
