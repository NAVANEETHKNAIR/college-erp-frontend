import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public staffList:any;
public selectStaff:any;
public staffForm:FormGroup;
public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER STAFF'];
public name:any = '';
public erp_id:any = '';
public gender:any = '';
public address:any = '';
public phone:any = '';
public birthday:any = '';
public email :any = '';
public type:any = '';
public dormitory:any = '';
public transport:any = '';
public date_of_join:any = '';
public aadhar_num:any = '';
public account_name:any = '';
public account_number:any = '';
public ifsc:any = '';
public caste :any = '';
public session:any = '';
public url:any = 'http://localhost:3000';
public urladd:any;
public editMode:boolean;
  constructor(public http: Http) {
  this.initializeForm();


}

  ngOnInit() {

  }

  getStaffMethod(value){
    console.log("getStaffMethod value:",value);
   if(value == 'TEACHER'){
      this.urladd = '/teacher/teacher_get_all';
      this.type = 'TEACHER';
    }

    else if(value == 'ACCOUNTANT'){
      this.urladd = '/accountant/accountant_get_all';
      this.type = 'ACCOUNTANT';
    }

    else if(value == 'LIBRARIAN'){
      this.urladd = '/librarian/librarian_get_all';
      this.type = 'LIBRARIAN';
    }

    else{
      this.urladd = '/otherstaff/otherstaff_get_all';
      this.type = 'OTHERSTAFF';
    }

    this.http.post((this.url + this.urladd),{})
    .subscribe((staff)=>{
      console.log(staff.json());
      this.staffList = staff.json();
      //this.rowsOnPage = this.staffList.length();
    })
    

   
  }


  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  initializeForm(){
   this.staffForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
  		"erp_id": new FormControl(this.erp_id,Validators.required),
  		"phone": new FormControl(this.phone,Validators.required),
  		"gender": new FormControl(this.gender,Validators.required),
  		"address": new FormControl(this.address,Validators.required),
  		"birthday": new FormControl(this.birthday,Validators.required),
  		"email": new FormControl(this.email,Validators.required),
      "type" : new FormControl(this.type,Validators.required), 		
  		"dormitory": new FormControl(this.dormitory),
  		"transport":new FormControl(this.transport),
  		"date_of_join": new FormControl(this.date_of_join,Validators.required),
  		"aadhar_num": new FormControl(this.aadhar_num),
  		"account_name": new FormControl(this.account_name),
  		"account_number": new FormControl(this.account_number),
  		"ifsc": new FormControl(this.ifsc),
  		"caste": new FormControl(this.caste,Validators.required),
  		"session": new FormControl(this.session,Validators.required)
   });
  }
  
  putStaff(value){
  	 console.log(value);
  	 if(!value.dormitory){
        value.dormitory = undefined;

  	 }

  	 if(!value.transport){
  	 	value.transport = undefined;
  	 }
     
     if(value.type == 'TEACHER'){
      this.urladd = '/teacher/teacher';
    }

    else if(value.type == 'ACCOUNTANT'){
      this.urladd = '/accountant/acountant';
    }

    else if(value.type == 'LIBRARIAN'){
      this.urladd = '/librarian/librarian';
    }

    else{
      this.urladd = '/otherstaff/otherstaff_get_all';
    }



  	// let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post((this.url+this.urladd),{
    	"username":value.email,
    	"password":"12345",
    	"name":value.name,
    	"erp_id": value.erp_id,
    	"phone": value.phone,
    	"gender": value.gender,
    	"address": value.address,
      "birthday": value.birthday,
      "email": value.email,
      "type": value.type,
      "dormitory": value.dormitory,
      "transport": value.transport,
      "date_of_join": value.date_of_join,
      "aadhar_num":value.aadhar_num,
      "account_name": value.account_name,
      "account_number":value.account_number,
      "ifsc":value.ifsc,
      "caste": value.caste,
      "session": value.session


    }).subscribe((staff:any)=>{
           this.getStaffMethod(value.type);
              	   
        });    
  }

  addStaff(){
  	  this.editMode = false;     
  	  this.name = '';
  		this.erp_id =  '';
  		this.gender =  '';
  		this.address = '';
      this.phone = '';
  		this.birthday ='';
  		this.email = '';
      this.type = '';
  		this.dormitory = '';
  		this.transport ='';
  		this.date_of_join ='';
  		this.aadhar_num ='';
  		this.account_name = '';
  		this.account_number = '';
  		this.ifsc ='';
  		this.caste ='';
  		this.session = '';
  		// console.log("section before editing",this.section);
        this.initializeForm();
        console.log(this.staffForm);

        this.openMyModal('effect-13');

    

  }

  editStaff(staff){
     this.editMode = true;
  	  this.name = (this.staffList[staff]).name;
  		this.erp_id =  (this.staffList[staff]).erp_id;
  		this.gender =  (this.staffList[staff]).gender;
  		this.address = (this.staffList[staff]).address;
      this.phone = (this.staffList[staff]).phone;
  		this.birthday = (this.staffList[staff]).birthday;
  		this.email = (this.staffList[staff]).email;
  		this.dormitory = (this.staffList[staff]).dormitory;
  		this.transport = (this.staffList[staff]).transport;
  		this.date_of_join = (this.staffList[staff]).date_of_join;
  		this.aadhar_num = (this.staffList[staff]).aadhar_num;
  		this.account_name = (this.staffList[staff]).account_name;
  		this.account_number = (this.staffList[staff]).account_number;
  		this.ifsc = (this.staffList[staff]).ifsc;
  		this.caste = (this.staffList[staff]).caste;
  		this.session = (this.staffList[staff]).session;
  		// console.log("section before editing",this.section);
  		// this.getClassMethodForm(this.class);
        this.initializeForm();
        console.log(this.staffForm);
        this.openMyModal('effect-13');
  }
}
