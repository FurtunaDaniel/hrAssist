import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTechnologiesComponent } from './user-technologies.component';

describe('UserTechnologiesComponent', () => {
  let component: UserTechnologiesComponent;
  let fixture: ComponentFixture<UserTechnologiesComponent>;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ UserTechnologiesComponent ]
	})
	.compileComponents();
  }));

  beforeEach(() => {
	fixture = TestBed.createComponent(UserTechnologiesComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });
});
