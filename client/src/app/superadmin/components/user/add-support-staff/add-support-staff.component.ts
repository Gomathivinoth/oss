import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HospitalService } from '../../../../services/hospital.service';
@Component({
  selector: 'app-add-support-staff',
  templateUrl: './add-support-staff.component.html',
  styleUrls: ['./add-support-staff.component.css']
})

export class AddSupportStaffComponent implements OnInit {

  currentUrl;
  selectHospital;
  hospitalName;
  hospitalId;
  hospitalLists;
  showAddSupportStaff = false;
  showAddSupportStaff1 = false;
  selectSurgeon = false;
  supportStaffList;
  selectBranch = false;
  branchLists;
  surgeonList;

  supportStaff = {
    branchId:'',
    hospitalId:'',
    name:'',
    username:'',
    password:''
  }

   editAdmin = {
     editbranchId:'',
    edithospitalId:'',
    editname:'',
    editusername:'',
    editpassword:''
  }

  constructor(
    private hospitalService:HospitalService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  showAddSupportStaffForm(id){
    this.selectBranch = true;
    this.hospitalService.getBranches(id).subscribe(data => {
      this.branchLists = data.message;
      
     // console.log(this.branchLists);
    });
  }
 showAddSupportStaffNameForm(id){
   console.log(id);
  this. selectSurgeon = true;
  this.hospitalService.getSurgeon(id).subscribe(data => {
      this.surgeonList = data.message;
      
     // console.log(this.branchLists);
    });
 }
  showAddSupportStaffSurgeonForm(id){
   this. showAddSupportStaff = true;
    this.hospitalService.viewBranchAdmin(id).subscribe(data => {
  this.supportStaffList = data.message;
  console.log(this.supportStaffList);
    });
  }
  addSupportStaff(supportStaff){
    //console.log(supportStaff);
     this.hospitalService.addSupportStaff(supportStaff).subscribe(data => {
     //console.log(data.message);
      this.supportStaff.name = '';
    this.supportStaff.username = '';
    this.supportStaff.password = '';
    this.supportStaffList = data.data;
    console.log(this.supportStaffList);
     this.showAddSupportStaffSurgeonForm(supportStaff.hospitalId);
    });
  }

   editSupportStaff(id){
   //console.log(id);
    this.selectHospital = false;
    this.showAddSupportStaff1 = true;
    this.hospitalService.getSingleHospitalAdmin(id).subscribe(data => {
     console.log(data.message);
      this.editAdmin.edithospitalId = data.message._id;
      this.editAdmin.editname = data.message.name;
      this.editAdmin.editusername = data.message.username;
      this.editAdmin.editpassword = data.message.password;
      console.log(this.editAdmin);
    });
  }
  updateSupportStaff(editAdmin){
    this.hospitalService.updateHospitalAdmin(editAdmin).subscribe(data => {
    this.showAddSupportStaff1 = false; 
     this.selectHospital = true;
    });
  }
   deleteSupportStaff(id){
    console.log(id);
    this.hospitalService.deleteHospitalAdmin(id).subscribe(data =>{
     this.supportStaffList = data.message;
    });
  }
 ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    console.log(this.currentUrl.id);
    if(this.currentUrl.id == undefined){
      this.selectHospital = true;
      this.hospitalService.getHospitals().subscribe(data => {
        this.hospitalLists = data.message;
      });
    } else {
      this.hospitalService.getSingleBranchAdmin(this.currentUrl.id).subscribe(data =>{
        if(data.success){
         // this.hospitalName = data.message.hospitalName;
          this.supportStaff.branchId = this.currentUrl.id;
          this.hospitalService.viewBranchAdmin(this.currentUrl.id).subscribe(data => {
            this.supportStaffList = data.message;
          });
        }
      });
      this.selectHospital = false;
    }
  }

}
