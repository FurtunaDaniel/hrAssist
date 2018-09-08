import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss'],
	providers: [UserService],
})
export class UserDetailsComponent implements OnInit {
	constructor(private route: ActivatedRoute) {}

	ngOnInit() {}
}
