import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchAdminComponent } from './add-branch-admin.component';

describe('AddBranchAdminComponent', () => {
  let component: AddBranchAdminComponent;
  let fixture: ComponentFixture<AddBranchAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBranchAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBranchAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
