import { Component } from '@angular/core';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { UserService } from '../services/user.service';
@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss'],
	providers: [UserService],
})
export class UserDetailsComponent {
	constructor() {}
}
