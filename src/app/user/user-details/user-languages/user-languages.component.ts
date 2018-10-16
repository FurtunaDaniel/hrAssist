import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { ToggleCard } from '@app/shared';
import { UserService } from '@app/user/services';
import { LangaugesService } from './langauges.service';
import { Language } from '@app/user/models';

@Component({
	selector: 'app-user-languages',
	templateUrl: './user-languages.component.html',
	styleUrls: ['./user-languages.component.scss']
})
export class UserLanguagesComponent implements OnInit, ToggleCard {
	public isLoading: boolean;
	public showForm: boolean;
	public languages: Language[];
	public userLanguages: Language[];
	public languagesToAdd: FormArray;
	public languageFormGroup: FormGroup;
	public languagesToRemove: any[];
	public cardVisibilitySubject: Subject<any> = new Subject();

	private initUserLanguages: any[];

	constructor(
		private languageService: LangaugesService,
		private userService: UserService,
		private formBuilder: FormBuilder
	) {
		this.showForm = false;
		this.isLoading = true;
		this.languageFormGroup = new FormGroup({});
		this.languagesToRemove = [];
	}

	ngOnInit() {
		this.languageService.getLanguages().subscribe(languages => {
			this.languages = languages;
			this.isLoading = false;
		});

		this.getUserLanguages();

		this.languageFormGroup = this.formBuilder.group({
			languagesToAdd: this.formBuilder.array([this.createItem()])
		});
	}

	/* Display language name in autocomplete */
	public displayFn(language): string {
		return language && typeof language === 'object'
			? language.long_name
			: language;
	}

	/* Add more fields (autocomplete and lvl range) */
	public addFields(): void {
		(this.languageFormGroup.get('languagesToAdd') as FormArray).push(
			this.createItem()
		);
	}

	public removeField(index): void {
		this.languagesToAdd.removeAt(index);
	}

	/* Remove languages from user languages list and prepare them to request on server to remove them */
	public removeLanguage(language, index): void {
		this.userLanguages.splice(index, 1);
		this.languagesToRemove.push(language.language_id);
	}

	public getLevelText(data): string {
		switch (data) {
			case 1:
				return 'Elementary proficiency';
			case 2:
				return 'Limited working proficiency';
			case 3:
				return 'Professional working proficiency';
			case 4:
				return 'Full professional proficiency';
			case 5:
				return 'Native or bilingual proficiency';
			default:
				return 'Please select your experience level';
		}
	}
	onToggle(event?): void {
		if (!event) {
			this.cardVisibilitySubject.next(this.showForm);
		} else {
			this.showForm = event.visible;
		}
		this.languagesToRemove = [];
	}
	public onSubmit(event): void {
		event.preventDefault();
		/* check if are language to remove but also to update */
		if (
			this.languagesToRemove.length &&
			this.languageFormGroup.value.languagesToAdd[0].language != ''
		) {
			this.userService
				.deleteUserLanguages(this.languagesToRemove)
				.subscribe(data => {
					/* After was removed unwanted languages, will update the list */
					this.updateLanguages();
				});
		} else if (
			this.languagesToRemove.length &&
			this.languageFormGroup.value.languagesToAdd[0].language == ''
		) {
			/* check if are language to remove but not to update */
			/* In this case will just remove the unwanted languages */
			this.userService
				.deleteUserLanguages(this.languagesToRemove)
				.subscribe(data => {
					this.userLanguages = this.initUserLanguages.slice(0);
				});
		} else if (
			this.languageFormGroup.value.languagesToAdd[0].language != ''
		) {
			/* check if are language to update, and update the list */
			this.updateLanguages();
		}
		this.onToggle();
	}

	private getUserLanguages() {
		this.userService.getUserLanguages().subscribe(languages => {
			this.userLanguages = languages;
			/* create a list with initial user language */
			this.initUserLanguages = languages;
		});
	}

	private updateLanguages() {
		this.userService
			.updateUserLanguages(this.languageFormGroup.value.languagesToAdd)
			.subscribe(data => {
				/* We need to ask again for all the user languages because the format of languages
				* that came as response from PUT looks like shit just Ids */
				this.getUserLanguages();

				/* Reset form */
				this.languageFormGroup.reset();

				/* Reset form controls */
				this.languageFormGroup = this.formBuilder.group({
					languagesToAdd: this.formBuilder.array([this.createItem()])
				});
			});
	}
	private createItem(): FormGroup {
		return this.formBuilder.group({
			language: '',
			level: ''
		});
	}
}
