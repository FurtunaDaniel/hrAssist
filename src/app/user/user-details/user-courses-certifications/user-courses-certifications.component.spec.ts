import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoursesCertificationsComponent } from './user-courses-certifications.component';

describe('UserCoursesCertificationsComponent', () => {
  let component: UserCoursesCertificationsComponent;
  let fixture: ComponentFixture<UserCoursesCertificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCoursesCertificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoursesCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
