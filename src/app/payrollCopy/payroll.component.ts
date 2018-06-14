import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';
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
// public staffList:any;
// public selectStaff:any;
public classForm:FormGroup;
public section:any;
public staffList:any = [];
public selectStaff:any;
public payrollForm:FormGroup;
public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER'];
// public sectionForm: FormGroup;
// public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER STAFF'];
public name:any = '';
public erp_id:any = '';
public className:any;
public filterClass:any;
public session:any = '';
public url:any = 'http://localhost:3000';
public urladd:any;
public editMode:boolean;
public classList:any;
public getSectionOfClass;
public classDetail:any;
public id:any;
public sectionList:any;
public cookie:any;
public studentList:any[] = [];
public getClassAll:any;
public selectSection:any;
public selectClass:any;
public result:any;
public checkStatus:any[] = [];
public feesForm:FormGroup;
public staffs:any[] = [];
public class_ref:any;
public date:any;
public type:any;
public staff:any;

  constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    console.log(this.cookieService.getAll()['cookieSet']);
    this.initializeForm();
    
  });
   this.initializeForm();
  }

  ngOnInit() {
    // this.http.post(this.url + '/newClass/get_class_all',{ "access_token": this.cookie})
    //   .subscribe((data) => {
    //     console.log(data.json());
    //     this.getClassAll = data.json();
    //     let classArray:any
    //     this.filterClass= _.uniq(_.pluck(this.getClassAll,'name')); 
          

    //     console.log("filterCLass:",this.filterClass);
    //   });
  }
  
  getStaffMethod(value){
    this.staff = value.toLowerCase();
    this.staffList = [];
    console.log("getStaffMethod value:",value);
    this.type = value.toUpperCase();
    this.initializeForm();
    console.log("type:",this.type)
    this.http.post((this.url + '/' + this.staff + '/' + this.staff + '_get_all'),{ access_token: this.cookie,session: this.session})
    .subscribe((staff)=>{
      console.log(staff.json());

      this.staffList = staff.json();
      this.rowsOnPage = this.staffList.length;
    })
    
    
   
  }
  
   openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

   closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  proceed(){
    this.staffs = [];
    this.openMyModal('effect-13');
  }

  addAllowance(){
    (<FormArray>this.payrollForm['controls']['allowances']).push(new FormGroup({
        "description": new FormControl('',Validators.required),
        "amount": new FormControl('',Validators.required)
              }));
    console.log(this.payrollForm);

      //this.initializeForm();
  }

  deleteAllowance(i){
    (<FormArray>this.payrollForm['controls']['allowances']).removeAt(i);
    console.log(this.payrollForm);
    //this.initializeForm();
  }

  addDeduction(){
   (<FormArray>this.payrollForm['controls']['deductions']).push(new FormGroup({
        "description": new FormControl('',Validators.required),
        "amount": new FormControl('',Validators.required)
              }));
    console.log(this.payrollForm);
    //this.initializeForm();
  }

  deleteDeduction(i){
    (<FormArray>this.payrollForm['controls']['deductions']).removeAt(i);
    
    console.log(this.payrollForm);
    //this.initializeForm();
  }

  generatePayroll(value){
    //salary: [{basic_sal:2300,allowances:[{description:500,amount:260}],deductions:[{description:500,amount:260}]}]
    this.staffs = [];
    let salary = [];
    salary.push(value);
    console.log(this.checkStatus);
    console.log(value);
    for(let i=0;i<=this.checkStatus.length;i++){
      if(this.checkStatus[i] == true){
        this.staffs.push({staff:this.staffList[i]['_id'], status: 'Unpaid'})
      }
    }
    let date = (new Date()).toLocaleDateString().split("/")
    this.date = (date[2] + '-' + ((+date[0]<10)?'0'+date[0]:date[0]) + '-' + ((+date[1]<10)?'0'+date[1]:date[1]));
    this.http.post(this.url + '/payroll/payroll_create_'+ this.staff,{
      date: this.date,
      staffs: this.staffs,
      salary: salary,
      session: this.session,
      access_token: this.cookie

    }).subscribe((payroll)=>{
      console.log(payroll.json());
    })

  }

  initializeForm(){
    this.payrollForm = new FormGroup({
      "allowances":new FormArray([]),
      "deductions": new FormArray([]),
      "basic_sal": new FormControl("",Validators.required)
    })
  }




}

 

