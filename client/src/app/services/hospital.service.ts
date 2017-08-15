import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class HospitalService {

  domain = "http://localhost:3000/"; // Development Domain - Not Needed in Production
  authToken;
  user;
  options;

  constructor(
    private http:Http
  ) { }

   createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
  }

  login(user){
    return this.http.post(this.domain+'authentication/login',user).map(res => res.json());
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  // Function to check if user is logged in
  loggedIn() {
    return tokenNotExpired();
  }

  addHospital(hospital){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'authentication/addHospital', hospital, this.options).map(res => res.json());
  }
  
  getHospitals(){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'authentication/getHospitals',this.options).map(res => res.json());
  }
  
  getSingleHospital(id){
      this.createAuthenticationHeaders(); // Create headers
      return this.http.get(this.domain + 'authentication/getSingleHospital/'+id , this.options).map(res => res.json());
  }

  updateHospital(hospital){
      console.log(hospital);
      this.createAuthenticationHeaders(); // Create headers
      return this.http.put(this.domain + 'authentication/updateHospital/' , hospital , this.options).map(res => res.json());
  }

  deleteHospital(id){
      //console.log(id);
      this.createAuthenticationHeaders(); // Create headers
      return this.http.delete(this.domain + 'authentication/deleteHospital/'+id , this.options).map(res => res.json());
  }

  addBranch(branch){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'authentication/addBranch/', branch , this.options).map(res => res.json());
  }

  getBranches(id){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'authentication/getBranches/'+id , this.options).map(res => res.json());
  }

  addHospitalAdmin(hospitalAdmin){
    console.log(hospitalAdmin);
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'authentication/addHospitalAdmin', hospitalAdmin, this.options).map(res => res.json());
  }

  viewHospitalAdmin(id){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'authentication/viewHospitalAdmin/'+id , this.options).map(res => res.json());
  }

  addBranchAdmin(branchAdmin){
    //console.log(branchAdmin);
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'authentication/addBranchAdmin', branchAdmin, this.options).map(res => res.json());
  }

  getSingleBranchAdmin(id){
     //console.log(id);
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'authentication/getSingleBranchAdmin/'+id , this.options).map(res => res.json());
  }

  viewBranchAdmin(id){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'authentication/viewBranchAdmin/'+id , this.options).map(res => res.json());
  }

   addSurgeon(surgeon){
   // console.log(surgeon);
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'authentication/addSurgeon', surgeon, this.options).map(res => res.json());
  }

   getSingleHospitalAdmin(id){
   //  console.log(id);
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'authentication/getSingleHospitalAdmin/'+id , this.options).map(res => res.json());
  }

  updateHospitalAdmin(id){
     // console.log(id);
      this.createAuthenticationHeaders(); // Create headers
      return this.http.put(this.domain + 'authentication/updateHospitalAdmin/' , id , this.options).map(res => res.json());
  }
  
  deleteHospitalAdmin(hospitalAdmin){
      //console.log(id);
      this.createAuthenticationHeaders(); // Create headers
      return this.http.delete(this.domain + 'authentication/deleteHospitalAdmin/'+hospitalAdmin , this.options).map(res => res.json());
  }

  getSurgeon(id){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'authentication/getSurgeon/'+id , this.options).map(res => res.json());
  }

   addSupportStaff(supportStaff){
   // console.log(surgeon);
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'authentication/addSupportStaff', supportStaff, this.options).map(res => res.json());
  }
  // getBranchName(id){
  //   console.log(id);
  //   this.createAuthenticationHeaders(); // Create headers
  //   return this.http.get(this.domain + 'authentication/getBranchName/'+id , this.options).map(res => res.json());
  // }

}
