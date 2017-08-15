import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HospitalService } from '../../../../services/hospital.service';

@Component({
  selector: 'app-add-surgeon',
  templateUrl: './add-surgeon.component.html',
  styleUrls: ['./add-surgeon.component.css']
})
export class AddSurgeonComponent implements OnInit {

  currentUrl;
  selectHospital;
  hospitalName;
  hospitalId;
  hospitalLists;
  showAddSurgeon = false;
  showAddSurgeon1 = false;
  surgeonList;
  selectBranch = false;
  branchLists;

  surgeon = {
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

  showAddSurgeonForm(id){
    this.selectBranch = true;
    this.hospitalService.getBranches(id).subscribe(data => {
      this.branchLists = data.message;
      this.surgeonList = '';
     // console.log(this.branchLists);
    });
  }
 showAddBranchAdminNameForm(id){
   console.log(id);
  this. showAddSurgeon = true;
  this.hospitalService.viewBranchAdmin(id).subscribe(data => {
  this.surgeonList = data.message;
    });
 }
  addSurgeon(surgeon){
    console.log(surgeon);
     this.hospitalService.addSurgeon(surgeon).subscribe(data => {
    //  console.log(data.message);
      this.surgeon.name = '';
    this.surgeon.username = '';
    this.surgeon.password = '';
    this.surgeonList = data.data;
     //this.showAddSurgeonForm(surgeon.hospitalId);
    });
  }

   editSurgeon(id){
   //console.log(id);
    this.selectHospital = false;
    this.showAddSurgeon1 = true;
    this.hospitalService.getSingleHospitalAdmin(id).subscribe(data => {
     console.log(data.message);
      this.editAdmin.edithospitalId = data.message._id;
      this.editAdmin.editname = data.message.name;
      this.editAdmin.editusername = data.message.username;
      this.editAdmin.editpassword = data.message.password;
      console.log(this.editAdmin);
    });
  }
  updatesurgeon(editAdmin){
    this.hospitalService.updateHospitalAdmin(editAdmin).subscribe(data => {
    this.showAddSurgeon1 = false; 
     this.selectHospital = true;
    });
  }
   deleteSurgeon(id){
    console.log(id);
    this.hospitalService.deleteHospitalAdmin(id).subscribe(data =>{
     this.surgeonList = data.message;
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
          this.surgeon.branchId = this.currentUrl.id;
          this.hospitalService.viewBranchAdmin(this.currentUrl.id).subscribe(data => {
            this.surgeonList = data.message;
          });
        }
      });
      this.selectHospital = false;
    }
  }

}
