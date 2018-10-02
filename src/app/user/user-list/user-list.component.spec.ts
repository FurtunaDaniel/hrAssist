import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {
	MatInputModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatTableModule,
	MatListModule,
	MatIconModule,
	MatPaginatorModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserService } from '@app/user/services';

describe('UserListComponent', () => {
	let component: UserListComponent;
	let fixture: ComponentFixture<UserListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MatInputModule,
				MatProgressSpinnerModule,
				MatProgressBarModule,
				MatTableModule,
				MatListModule,
				RouterModule,
				MatIconModule,
				MatPaginatorModule,
			],
			providers: [UserService],
			declarations: [UserListComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });
});
