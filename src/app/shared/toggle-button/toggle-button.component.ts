import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'app-toggle-button',
	templateUrl: './toggle-button.component.html',
	styleUrls: ['./toggle-button.component.scss'],
})
export class ToggleButtonComponent implements OnInit, OnDestroy {
	@Input()
	name: string;
	@Input()
	disableButton: boolean;
	@Output()
	cardVisibility = new EventEmitter();
	@Input()
	cardVisibilitySubject: Subject<any>;
	visible: boolean;

	constructor() {
		this.visible = false;
	}

	ngOnInit() {
		/* cardVisibilitySubject check if is changed the visibility of card by the parent component */
		this.cardVisibilitySubject.subscribe(cardVisibility => {
			/* because was changed, the value of visible shoud be changed also and emit and will notify the parent component that was changed */
			this.visible = !cardVisibility;
			this.cardVisibility.emit({ visible: this.visible });
		});
	}

	toggle() {
		this.visible = !this.visible;
		this.cardVisibility.emit({ visible: this.visible });
	}
	ngOnDestroy() {
		this.cardVisibilitySubject.unsubscribe();
	}
}
