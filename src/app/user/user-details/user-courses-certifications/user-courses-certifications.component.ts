import { Component, OnInit } from '@angular/core';
import { ToggleCard } from '@app/shared';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-user-courses-certifications',
	templateUrl: './user-courses-certifications.component.html',
	styleUrls: ['./user-courses-certifications.component.scss'],
})
export class UserCoursesCertificationsComponent implements OnInit, ToggleCard {
	/* Toggle Card Proprieties
	* these are required for each card
	*/
	public cardVisibilitySubject: Subject<any> = new Subject();
	public showForm: boolean;
	public isLoading: boolean;
	/*End Toggle Card Proprieties */
	constructor() {}

	ngOnInit() {}
	onToggle(event?): void {
		if (!event) {
			this.cardVisibilitySubject.next(this.showForm);
		} else {
			this.showForm = event.visible;
		}
	}
}
