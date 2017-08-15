
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HospitalService } from '../../../../services/hospital.service';

@Component({
  selector: 'app-add-hospital-admin',
  templateUrl: './add-hospital-admin.component.html',
  styleUrls: ['./add-hospital-admin.component.css']
})
export class AddHospitalAdminComponent implements OnInit {

  currentUrl;
  selectHospital;
  hospitalName;
  hospitalId;
  hospitalLists;
  showAddHospitalAdmin = false;
  showAddHospitalAdmin1 = false;
  hospitalAdminList;
  

  hospitalAdmin = {
    hospitalId:'',
    name:'',
    username:'',
    password:''
  }
  
   editAdmin = {
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

  showAddHospitalAdminForm(id){
    this.showAddHospitalAdmin = true;
    this.hospitalAdmin.name = '';
    this.hospitalAdmin.username = '';
    this.hospitalAdmin.password = '';
    this.hospitalService.viewHospitalAdmin(id).subscribe(data => {
      this.hospitalAdminList = data.message;
    });
  }
   
  addHospitalAdmin(hospitalAdmin){
    //console.log(hospitalAdmin);
     this.hospitalService.addHospitalAdmin(hospitalAdmin).subscribe(data => {
    //  console.log(data.message);
     this.hospitalAdmin.name = '';
     this.hospitalAdmin.username = '';
     this.hospitalAdmin.password = '';
     this.showAddHospitalAdminForm(hospitalAdmin.hospitalId);
    });
  }

  editHospitalAdmin(id){
   //console.log(id);
    this.selectHospital = false;
    this.showAddHospitalAdmin1 = true;
    this.hospitalService.getSingleHospitalAdmin(id).subscribe(data => {
     console.log(data.message);
      this.editAdmin.edithospitalId = data.message._id;
      this.editAdmin.editname = data.message.name;
      this.editAdmin.editusername = data.message.username;
      this.editAdmin.editpassword = data.message.password;
      console.log(this.editAdmin);
    });
  }

  updateHospitalAdmin(hospitalAdmin){
    this.hospitalService.updateHospitalAdmin(hospitalAdmin).subscribe(data => {
    this.showAddHospitalAdmin1 = false; 
     this.selectHospital = true;
    });
  }

  deleteHospitalAdmin(id){
    console.log(id);
    this.hospitalService.deleteHospitalAdmin(id).subscribe(data =>{
     this.hospitalAdminList = data.message;
    });
  }

  goBack(){
    this.showAddHospitalAdmin1 = false; 
    this.selectHospital = true;
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    if(this.currentUrl.id == undefined){
      this.selectHospital = true;
      this.hospitalService.getHospitals().subscribe(data => {
        this.hospitalLists = data.message;
      });
    } else {
      this.hospitalService.getSingleHospital(this.currentUrl.id).subscribe(data =>{
        if(data.success){
          this.hospitalName = data.message.hospitalName;
          this.hospitalAdmin.hospitalId = this.currentUrl.id;
          this.hospitalService.viewHospitalAdmin(this.currentUrl.id).subscribe(data => {
            this.hospitalAdminList = data.message;
          });
        }
      });
      this.selectHospital = false;
    }
  }

}
