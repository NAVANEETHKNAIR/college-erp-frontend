import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public payrollList:any;
public payrollForm: FormGroup;
public name:any = '';
public vehicle_num:any = '';
public erp_id:any;
public fare:number = 0;
public session:any = '';
public url:any = 'http://localhost:3000';
public allpayroll:any;
public basic_sal:any;
public month:any;
public allowances:any;
public deductions:any;
public editMode:boolean;
public id:any;
  constructor(public http: Http) {
  this.initializeForm();


}

ngOnInit() {
     this.getallpayroll();
  }
  
getallpayroll(){
 this.http.post((this.url+'/payroll/payroll_get_all'),{})
 .subscribe((payroll)=>{
   console.log(payroll.json());
   this.allpayroll = payroll.json();
   this.payrollList = _.pluck(this.allpayroll,'name');
 });
}
  
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  initializeForm(){
   this.payrollForm = new FormGroup({
      "erp_id": new FormControl(this.erp_id,Validators.required),
  		"basic_sal": new FormControl(this.basic_sal,Validators.required),
      "allowances":new FormArray([new FormControl()]),
      "deductions":new FormArray([new FormControl()]),
      "month": new FormControl(this.month,Validators.required),
  		"session": new FormControl(this.session,Validators.required)
   });
  }
  
  putpayroll(value){
  	 console.log(value);
 
  	// let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post((this.url+'/payroll/payroll'),{
    	"name": value.name,
      "vehicle_num": value.vehicle_num,
      "erp_id": value.erp_id,
      "fare": +value.fare,
      "session": value.session


    }).subscribe((payroll:any)=>{
        this.getallpayroll();
           // this.getStaffMethod(value.type);
              	   
        });    
  }

  putEditedpayroll(value){
    console.log(value);

    this.http.post((this.url+ '/payroll/payroll_edit'),{
      "_id": this.id,
      "name": value.name,
      "vehicle_num": value.vehicle_num,
      "erp_id": value.erp_id,
      "fare": +value.fare,
      "session": value.session

    }).subscribe((editedpayroll)=>{
      console.log(editedpayroll.json());
      this.getallpayroll();

    })
  }


  //addAllowance



  addpayroll(){
  	  this.editMode = false;     
  	  this.name = '';
      this.id = '';
      this.fare = 0;
      this.vehicle_num = '';
      this.erp_id = '';
  		this.session = '';
      this.initializeForm();
      console.log(this.payrollForm);
      this.openMyModal('effect-13');

    

  }

  editpayroll(index){
     this.editMode = true;
     this.id = (this.allpayroll[index])._id;
  	 this.name = (this.allpayroll[index]).name;
     this.vehicle_num = (this.allpayroll[index]).vehicle_num;
     this.erp_id = (this.allpayroll[index]).erp_id;
     this.fare = +(this.allpayroll[index]).fare;
  	 this.session = (this.allpayroll[index]).session;
        this.initializeForm();
        console.log(this.payrollForm);
        this.openMyModal('effect-13');
  }
}
