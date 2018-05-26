import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService
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
public user_id:any;
public staffList: any;
public monthArray:any = [1,2,3,4,5,6,7,8,9,10,11,12];
public status:any;
public generatedPayslip:boolean = false;
public index:number;
public cookie:any;
  constructor(public http: Http,private cookieService: CookieService) {
  this.cookie = this.cookieService.getAll()['cookieSet'];
  this.initializeForm();
  console.log(this.payrollForm);



}

ngOnInit() {
         
}
  
getStaff(staff){

    this.generatedPayslip = false;
    this.staffList = [];
    this.basic_sal = '';
    this.status = '';
    this.initializeForm();
    console.log(staff);
     this.http.post((this.url + '/'+ staff + '/' + staff + '_get_all'),{ access_token: this.cookie})
        .subscribe((staff)=>{
          console.log(staff.json());
          if(staff.json().length !== 0){
            this.staffList = staff.json();
          }
                
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
   this.payrollForm = new FormGroup({
      //"erp_id": new FormControl(this.erp_id,Validators.required),
  		"basic_sal": new FormControl(this.basic_sal,Validators.required),
      // "allowances":new FormArray([new FormGroup({
      //   "description": new FormControl('',Validators.required),
      //   "amount": new FormControl('',Validators.required)
      //         })]),
      // "deductions":new FormArray([new FormGroup({
      //   "description": new FormControl('',Validators.required),
      //   "amount": new FormControl('',Validators.required)
      //         })]),
      "allowances": new FormArray([]),
      "deductions": new FormArray([]),

       "month": new FormControl(this.month,Validators.required),
  		 "session": new FormControl(this.session,Validators.required),
      "status" : new FormControl(this.status,Validators.required)

   });
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
  
  putpayroll(value){
  	 console.log(value);

   this.http.post(this.url+ '/payroll/payroll',{
     user_id: this.user_id,
     basic_sal: value.basic_sal,
     month:this.month,
     allowances:value.allowances,
     deductions:value.deductions,
     session:value.session,
     status: value.status,
     access_token: this.cookie
   }).subscribe((payroll)=>{
     console.log(payroll.json())


   })   
  }


  payrollFormEdit(value){
    console.log(value);
    this.generatedPayslip  = value;
    this.addPayroll(this.index);
  }

  putEditedpayroll(value){
    console.log(value);


    // this.http.post((this.url+ '/payroll/payroll_edit'),{
    //   "_id": this.id,
    //   "name": value.name,
    //   "vehicle_num": value.vehicle_num,
    //   "erp_id": value.erp_id,
    //   "fare": +value.fare,
    //   "session": value.session

    // }).subscribe((editedpayroll)=>{
    //   console.log(editedpayroll.json());
    //   this.getallpayroll();

    // })

  }


  //addAllowance


  generatePayslip(){

    this.generatedPayslip = true;
    console.log(this.payrollForm.value);
    this.putpayroll(this.payrollForm.value);

  }

  addPayroll(i){
  	this.editMode = false;
    this.index = i;
    this.user_id = this.staffList[i].user_id;
    this.session = this.staffList[i].session;
    this.http.post(this.url + '/payroll/payroll_get_user_id',{
       user_id: this.user_id,
       month: this.month,
       session: this.session,
       access_token: this.cookie
    }).subscribe((payroll:any)=>{
        console.log(payroll.json());
       if(payroll.json().length!==0){
          let payrollValue = payroll.json()[0];
          this.basic_sal = payrollValue.basic_sal;
          this.month = payrollValue.month;
          this.session = payrollValue.session;
          this.status = payrollValue.status;
          this.initializeForm();
          for(let i=0;i<payrollValue.allowances.length;i++){
            (<FormArray>this.payrollForm.controls['allowances']).push(new FormGroup({
              "description": new FormControl(payrollValue.allowances[i]['description']),
              "amount" : new FormControl(payrollValue.allowances[i]['amount'])
            }))
              
          }

          for(let i=0;i<payrollValue.deductions.length;i++){
            (<FormArray>this.payrollForm.controls['deductions']).push(new FormGroup({
              "description": new FormControl(payrollValue.deductions[i]['description']),
              "amount" : new FormControl(payrollValue.deductions[i]['amount'])
            }))
          }

          this.openMyModal('effect-13');
       }

      else{
      console.log(this.payrollForm);
      this.basic_sal = '';
      this.month = '';
      this.session = '';
      this.status = '';
      this.initializeForm();
      this.openMyModal('effect-13');
      }


    })
    

      

    

  }

  editPayroll(index){
     this.editMode = true;
    //  this.id = (this.allpayroll[index])._id;
  	 // this.name = (this.allpayroll[index]).name;
    //  this.vehicle_num = (this.allpayroll[index]).vehicle_num;
    //  this.erp_id = (this.allpayroll[index]).erp_id;
    //  this.fare = +(this.allpayroll[index]).fare;
  	 // this.session = (this.allpayroll[index]).session;
    //     this.initializeForm();
        console.log(this.payrollForm);
        this.openMyModal('effect-12');
  }
}
