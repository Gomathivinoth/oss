import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupportStaffComponent } from './add-support-staff.component';

describe('AddSupportStaffComponent', () => {
  let component: AddSupportStaffComponent;
  let fixture: ComponentFixture<AddSupportStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupportStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupportStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
