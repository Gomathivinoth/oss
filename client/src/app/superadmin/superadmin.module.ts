import { NgModule } from '@angular/core';
import {AppRoutingModule} from './superadmin.routing';
import { SuperadminComponent } from './superadmin.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { UserComponent } from './components/user/user.component';
import { ProsthesisComponent } from './components/prosthesis/prosthesis.component';
import { OptionsComponent } from './components/options/options.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddHospitalComponent } from './components/hospital/add-hospital/add-hospital.component';
import { AddBranchComponent } from './components/hospital/add-branch/add-branch.component';

import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AddHospitalAdminComponent } from './components/user/add-hospital-admin/add-hospital-admin.component';
import { AddBranchAdminComponent } from './components/user/add-branch-admin/add-branch-admin.component';
import { AddSurgeonComponent } from './components/user/add-surgeon/add-surgeon.component';
import { AddSupportStaffComponent } from './components/user/add-support-staff/add-support-staff.component';

@NgModule({
  declarations: [
    SuperadminComponent,
    HospitalComponent,
    UserComponent,
    ProsthesisComponent,
    OptionsComponent,
    NavbarComponent,
    DashboardComponent,
    AddHospitalComponent,
    AddBranchComponent,
    AddHospitalAdminComponent,
    AddBranchAdminComponent,
    AddSurgeonComponent,
    AddSupportStaffComponent 
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [SuperadminComponent]
})
export class SuperadminModule { }
