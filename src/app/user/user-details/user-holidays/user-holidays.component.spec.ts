import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHolidaysComponent } from './user-holidays.component';

describe('UserHolidaysComponent', () => {
  let component: UserHolidaysComponent;
  let fixture: ComponentFixture<UserHolidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
