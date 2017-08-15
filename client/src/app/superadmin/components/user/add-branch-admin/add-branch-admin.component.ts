import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HospitalService } from '../../../../services/hospital.service';

@Component({
  selector: 'app-add-branch-admin',
  templateUrl: './add-branch-admin.component.html',
  styleUrls: ['./add-branch-admin.component.css']
})
export class AddBranchAdminComponent implements OnInit {

  currentUrl;
  selectHospital;
  hospitalName;
  hospitalId;
  hospitalLists;
  showAddBranchAdmin = false;
  showAddBranchAdmin1 = false;
  branchAdminList;
  selectBranch = false;
  branchLists;

  branchAdmin = {
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

  showAddBranchAdminForm(id){
    this.selectBranch = true;
    this.hospitalService.getBranches(id).subscribe(data => {
      this.branchLists = data.message;
      this.branchAdminList = '';
     // console.log(this.branchLists);
    });
  }
 showAddBranchAdminNameForm(id){
  // console.log(id);
  this. showAddBranchAdmin = true;
  this.hospitalService.viewBranchAdmin(id).subscribe(data => {
  this.branchAdminList = data.message;
    });
 }
  addBranchAdmin(branchAdmin){
    //console.log(branchAdmin);
     this.hospitalService.addBranchAdmin(branchAdmin).subscribe(data => {
      console.log(data.data);
      this.branchAdmin.name = '';
    this.branchAdmin.username = '';
    this.branchAdmin.password = '';
    this.branchAdminList = data.data;
      this.showAddBranchAdminNameForm(branchAdmin.branchId);
    });
  }

  editBranchAdmin(id){
   //console.log(id);
    this.selectHospital = false;
    this.showAddBranchAdmin1 = true;
    this.hospitalService.getSingleHospitalAdmin(id).subscribe(data => {
     console.log(data.message);
      this.editAdmin.edithospitalId = data.message._id;
      this.editAdmin.editname = data.message.name;
      this.editAdmin.editusername = data.message.username;
      this.editAdmin.editpassword = data.message.password;
      console.log(this.editAdmin);
    });
  }

  updateBranchAdmin(editAdmin){
    this.hospitalService.updateHospitalAdmin(editAdmin).subscribe(data => {
    this.showAddBranchAdmin1 = false; 
     this.selectHospital = true;
     //this.branchAdminList = data.message;
    });
  }

  deleteBranchAdmin(id){
    console.log(id);
    this.hospitalService.deleteHospitalAdmin(id).subscribe(data =>{
     this.branchAdminList = data.message;
    });
  }


  goBack(){
    this.showAddBranchAdmin1 = false; 
    this.selectHospital = true;
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
          this.branchAdmin.branchId = this.currentUrl.id;
          this.hospitalService.viewBranchAdmin(this.currentUrl.id).subscribe(data => {
            this.branchAdminList = data.message;
          });
        }
      });
      this.selectHospital = false;
    }
  }

}
