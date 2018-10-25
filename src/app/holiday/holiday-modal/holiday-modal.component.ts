import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-holiday-modal',
	templateUrl: './holiday-modal.component.html',
	styleUrls: ['./holiday-modal.component.scss']
})
export class HolidayModalComponent {

	constructor(public dialogRef: MatDialogRef<HolidayModalComponent>,
		           @Inject(MAT_DIALOG_DATA) public data: any
	) { }

	closeDialog(): void {
		this.dialogRef.close();
	}

}
