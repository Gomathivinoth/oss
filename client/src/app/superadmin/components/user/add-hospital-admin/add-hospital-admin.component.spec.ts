import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalAdminComponent } from './add-hospital-admin.component';

describe('AddHospitalAdminComponent', () => {
  let component: AddHospitalAdminComponent;
  let fixture: ComponentFixture<AddHospitalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHospitalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
