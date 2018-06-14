import { Component, OnInit, Renderer2,ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
import * as number2text from 'number2text';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-payslip-report',
  templateUrl: './payslip-report.component.html',
  styleUrls: ['./payslip-report.component.scss']
})
export class PayslipReportComponent implements OnInit {
@ViewChild('modalSmall') modalSmall:TemplateRef<any>;
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public printDiv:boolean = false;
// public staffList:any;
// public selectStaff:any;

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
public id:any;
public cookie:any;
public staff:any;
public type:any;
public staffList:any[] = [];
public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER'];
public checkStatus:any[] = [];

public class_ref:any;
public date:any;


public staffArray:any[] = [];
public payslipArray:any[] = [];
public dateArray:any[]= [];
public idArray:any[] = [];
public totalFeeSum:any[] = [];
public modalStaff:object;
public modalDate:any;
public modalPayslip:any;
public modalTotalPayslipSum:any;
public modalAllowancePayslipSum:any;
public modalDeductionPayslipSum:any;
public modalLooplen:any;
public modalOpen:boolean = false;
public filteredStaffArray:any[] = [];
public filteredPayslipArray:any[] = [];
public filteredDateArray:any[]= [];
public filteredIdArray:any[] = [];
public filteredPayslipSumArray:any[] = [];
public datePriorityStaffArray:any = []
public datePriorityPayslipArray:any[] = [];
public datePriorityDateArray:any[]= [];
public datePriorityIdArray:any[] = [];
public datePriorityStaffSumArray:any[] = [];
public statusPriorityStaffArray:any = []
public statusPriorityPayslipArray:any[] = [];
public statusPriorityDateArray:any[]= [];
public statusPriorityIdArray:any[] = [];
public statusPriorityPayslipSumArray:any[] = [];
public status:any;
public selectDate:any;
public erp:any;
public searchvalue:any;
public nameErpStringArray:any;
public searchNameErpString:any = [];
public byDate:string = 'Show All';
public byStatus:string = 'Show All';
public overdue:any;
public unpaidStatus:any = [];
public today:any;
public startDate:any;
public endDate:any;
public formattedStartDate:any;
public formattedEndDate:any;
public allowanceSumArray:any = [];
public deductionSumArray:any = [];
public totalAllowanceSum:any = [];
public totalDeductionSum:any = [];
public totalPayslipSum:any = [];
public datePriorityAllowanceSumArray:any = [];
public datePriorityDeductionSumArray:any = [];
public datePriorityTotalSumArray:any = [];
public statusPriorityAllowanceSumArray:any = [];
public statusPriorityDeductionSumArray:any = [];
public statusPriorityTotalSumArray:any = [];
public filteredAllowanceSumArray:any = [];
public filteredDeductionSumArray:any = [];
public filteredTotalSumArray:any = [];
public looplenArray:any = [];
public datePriorityLooplenArray:any=[];
public statusPriorityLooplenArray:any=[];
public filteredLooplenArray:any=[];
public modalNetSalaryText:any;

  constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService,public parseFormatter:NgbDateParserFormatter) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
   this.session = session.session;
   this.overdue = this.fetchsession.getOverdue();
    console.log('OverDue is:',this.overdue);
    console.log("session from session service",this.session);
    console.log(this.cookieService.getAll()['cookieSet']);
 
    
  });
   
  }

  ngOnInit() {
    // this.http.post(this.url + '/newClass/get_class_all',{ "access_token": this.cookie})
    //   .subscribe((data) => {
    //     console.log(data.json());
    //     this.getClassAll = data.json();
    //     let classArray:any
    //     this.filterClass= _.uniq(_.pluck(this.getClassAll,'name')); 
          
    
    //     console.log("filterCLass:",this.filterClass);
            let date = (new Date()).toLocaleDateString().split("/")    
           let todaydate = (date[2] + '-' + ((+date[0]<10)?'0'+date[0]:date[0]) + '-' + ((+date[1]<10)?'0'+date[1]:date[1]));
           this.today = todaydate;
     
  }
  
    getStaffMethod(value){
    this.datePriorityStaffArray = [];
    this.datePriorityDateArray = [];
    this.datePriorityPayslipArray = [];
    this.datePriorityIdArray = [];
    this.datePriorityAllowanceSumArray = [];
    this.datePriorityDeductionSumArray = [];
    this.datePriorityTotalSumArray = [];
    this.statusPriorityStaffArray = [];
    this.statusPriorityDateArray = [];
    this.statusPriorityPayslipArray = [];
    this.statusPriorityIdArray = [];
    this.statusPriorityTotalSumArray = [];
    this.statusPriorityAllowanceSumArray = [];
    this.statusPriorityDeductionSumArray = [];
    this.filteredStaffArray = [];
    this.filteredDateArray = [];
    this.filteredPayslipArray = [];
    this.filteredIdArray = [];
    this.filteredTotalSumArray = [];
    this.filteredAllowanceSumArray = [];
    this.filteredDeductionSumArray = [];
    this.staffArray = [];
    this.dateArray = [];
    this.payslipArray = [];
    this.idArray = [];
    this.totalFeeSum = [];
    this.totalAllowanceSum = [];
    this.totalDeductionSum = [];
    this.looplenArray = [];
    this.datePriorityLooplenArray=[];
    this.statusPriorityLooplenArray=[];
    this.filteredLooplenArray=[];
    this.status = '';
    this.staff = value.toLowerCase()

    console.log("getStaffMethod value:",value);
    this.type = value.toUpperCase();
    console.log("type:",this.type)
    this.http.post((this.url + '/payroll/get_payroll_for_'+ this.staff + '_all'),{ access_token: this.cookie,session: this.session})
    .subscribe((staff)=>{
      console.log(staff.json());
       
      this.staffList = staff.json();
      for(let staff of this.staffList){
           let allowanceSum =  +(_.pluck(staff.salary[0]['allowances'], 'amount')).reduce((acc,val)=>{

                return (+acc) + (+val);
              })
             this.allowanceSumArray.push(allowanceSum);

            }

     for(let staff of this.staffList){
           let  deductionSum =  +(_.pluck(staff.salary[0]['deductions'], 'amount')).reduce((acc,val)=>{

                return (+acc) + (+val);
              })
             this.deductionSumArray.push(deductionSum);

            }
   // //this.netSalaryInWords = number2text(this.netSalary);
   // for(let ){
   //   this.looplen =  (this.payslip.allowances.length>this.payslip.deductions.length?this.payslip.allowances.length:this.payslip.deductions.length)
   //   this.loopLenArray = this.looplenArrayMethod(this.looplen); 
   // }
  
     for(let i=0;i<this.staffList.length;i++){

                for(let j=0;j<this.staffList[i].staffs.length;j++){

                 this.staffArray.push(this.staffList[i].staffs[j]);
                 this.idArray.push(this.staffList[i]._id);
                 this.dateArray.push(this.staffList[i].date);
                 this.payslipArray.push(this.staffList[i].salary[0]);
                 this.totalAllowanceSum.push(this.allowanceSumArray[i]);
                 this.totalDeductionSum.push(this.deductionSumArray[i]);
                 this.totalPayslipSum.push(+this.staffList[i].salary[0]['basic_sal']+this.allowanceSumArray[i] - this.deductionSumArray[i]);
                 this.looplenArray.push(this.looplenArrayMethod(this.staffList[i].salary[0]['allowances'].length>this.staffList[i].salary[0]['deductions'].length?
                                        this.staffList[i].salary[0]['allowances'].length:this.staffList[i].salary[0]['deductions'].length));
               } 
            }

            this.rowsOnPage = this.staffList.length;
            this.datePriorityStaffArray = this.staffArray.slice();
            this.datePriorityIdArray = this.idArray.slice();
            this.datePriorityDateArray = this.dateArray.slice();
            this.datePriorityPayslipArray = this.payslipArray.slice();
            this.datePriorityAllowanceSumArray = this.totalAllowanceSum.slice();
            this.datePriorityDeductionSumArray = this.totalDeductionSum.slice();
            this.datePriorityLooplenArray = this.looplenArray.slice();
            this.datePriorityTotalSumArray = this.totalPayslipSum.slice();
            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();

            this.createNameErpString();
            this.checkOverDueStatus();



    })
  }



  
   openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

   closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  

  showPayslip(i){
     console.log(i);
    this.modalOpen = true;
    this.modalStaff = this.filteredStaffArray[i];
    this.modalPayslip = this.filteredPayslipArray[i];
    this.modalDate = this.filteredDateArray[i];
    this.modalTotalPayslipSum = this.filteredTotalSumArray[i];
    this.modalAllowancePayslipSum = this.filteredAllowanceSumArray[i];
    this.modalDeductionPayslipSum = this.filteredDeductionSumArray[i];
    this.modalLooplen = this.filteredLooplenArray[i];
    this.modalNetSalaryText = number2text(this.filteredTotalSumArray[i]);
    
   console.log("modalStaff",this.modalStaff);
   console.log("modalPayslip",this.modalPayslip);
   console.log("modalDate",this.modalDate);
   console.log("modalTotalPayslipSum",this.modalTotalPayslipSum);
   console.log("modalAllowancePayslipSum",this.modalAllowancePayslipSum); 
   console.log("modalDeductionPayslipSum",this.modalDeductionPayslipSum);
   console.log('modalNetSalaryText:',this.modalNetSalaryText);
     this.openMyModal('effect-13');
  }

  getStatus(value){
    console.log('Get Status valid:',Boolean(value));
   if(value){
    this.statusPriorityStaffArray = [];
    this.statusPriorityDateArray = [];
    this.statusPriorityPayslipArray = [];
    this.statusPriorityIdArray = [];
    this.statusPriorityTotalSumArray = [];
    this.statusPriorityAllowanceSumArray = [];
    this.statusPriorityDeductionSumArray = [];
    this.filteredStaffArray = [];
    this.filteredDateArray = [];
    this.filteredPayslipArray = [];
    this.filteredIdArray = [];
    this.filteredTotalSumArray = [];
    this.filteredAllowanceSumArray = [];
    this.filteredDeductionSumArray = [];

    this.status = value;
    if(value == 'show'){
        this.byStatus = 'Show All';

            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();

        this.createNameErpString();
        this.searchMethodNameErpString(this.searchvalue);
        this.checkOverDueStatus();
        return;
    }
    this.byStatus = value;
    console.log('checking if it is running if show is given');
    console.log(value);
    
    for(let i=0;i<this.datePriorityStaffArray.length;i++){
      if(this.datePriorityStaffArray[i]['status'] == this.status){
        this.statusPriorityStaffArray.push(this.datePriorityStaffArray[i]);
        this.statusPriorityDateArray.push(this.datePriorityDateArray[i]);
        this.statusPriorityPayslipArray.push(this.datePriorityPayslipArray[i]);
        this.statusPriorityIdArray.push(this.datePriorityIdArray[i]);
        this.statusPriorityTotalSumArray.push(this.datePriorityTotalSumArray[i]);
        this.statusPriorityAllowanceSumArray.push(this.datePriorityAllowanceSumArray[i]);
        this.statusPriorityDeductionSumArray.push(this.datePriorityDeductionSumArray[i]);
        this.statusPriorityLooplenArray.push(this.datePriorityLooplenArray[i]);
      }
    }
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();

            this.createNameErpString();
            this.searchMethodNameErpString(this.searchvalue);
            this.checkOverDueStatus();
  
    console.log(this.statusPriorityStaffArray); 
   }
  }

  getDate(value){
    //dateFormat : 2018-06-04(YYYY-MM-DD) 2018-05
   
    if(value){
    this.datePriorityStaffArray = [];
    this.datePriorityDateArray = [];
    this.datePriorityPayslipArray = [];
    this.datePriorityIdArray = [];
    this.datePriorityAllowanceSumArray = [];
    this.datePriorityDeductionSumArray = [];
    this.datePriorityTotalSumArray = [];
    this.statusPriorityStaffArray = [];
    this.statusPriorityDateArray = [];
    this.statusPriorityPayslipArray = [];
    this.statusPriorityIdArray = [];
    this.statusPriorityTotalSumArray = [];
    this.statusPriorityAllowanceSumArray = [];
    this.statusPriorityDeductionSumArray = [];
    this.filteredStaffArray = [];
    this.filteredDateArray = [];
    this.filteredPayslipArray = [];
    this.filteredIdArray = [];
    this.filteredTotalSumArray = [];
    this.filteredAllowanceSumArray = [];
    this.filteredDeductionSumArray = [];
    
    let todayDateValue = (new Date()).valueOf();  
    let yesterday = (new Date((new Date()).valueOf() - 1000*60*60*24)).toLocaleDateString().split("/")
    let week = (new Date((new Date()).valueOf() - 1000*60*60*24*7)).toLocaleDateString().split("/");

    let date = (new Date()).toLocaleDateString().split("/")    
    let todaydate = (date[2] + '-' + ((+date[0]<10)?'0'+date[0]:date[0]) + '-' + ((+date[1]<10)?'0'+date[1]:date[1]));
    this.today = todaydate;

    let yesterdaydate = (yesterday[2] + '-' + ((+yesterday[0]<10)?'0'+yesterday[0]:yesterday[0]) + '-' + ((+yesterday[1]<10)?'0'+yesterday[1]:yesterday[1]));
    let weekdate = (yesterday[2] + '-' + ((+week[0]<10)?'0'+week[0]:week[0]) + '-' + ((+week[1]<10)?'0'+week[1]:week[1]));
    let month = new Date();
     month.setMonth((+date[0]-2));
     console.log(month)
     let monthArray = month.toLocaleDateString().split('/')
     let monthdate =  (monthArray[2] + '-' + ((+monthArray[0]<10)?'0'+monthArray[0]:monthArray[0]) + '-' + ((+monthArray[1]<10)?'0'+monthArray[1]:monthArray[1]));
     console.log(value); 
     this.selectDate = value;
     console.log('date:',date);
     console.log('yesterdaydate:',yesterdaydate);
     console.log('weekdate:',weekdate);
     console.log('monthdate:',monthdate);
     
    
     if(this.selectDate == 'today'){
       this.byDate = 'Today';
       
       for(let i=0;i<this.dateArray.length;i++){

        if(todaydate == this.dateArray[i]){
        this.datePriorityStaffArray.push(this.staffArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityPayslipArray.push(this.payslipArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityTotalSumArray.push(this.totalPayslipSum[i]);
        this.datePriorityAllowanceSumArray.push(this.totalAllowanceSum[i]);
        this.datePriorityDeductionSumArray.push(this.totalDeductionSum[i]);
        this.datePriorityLooplenArray.push(this.looplenArray[i]);
        }

       }


            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
      
      this.createNameErpString();
      this.getStatus(this.status);
       console.log(this.searchvalue);
      this.searchMethodNameErpString(this.searchvalue);
      this.checkOverDueStatus();
  
       
     }

     else if(this.selectDate == 'yesterday'){
        this.byDate = 'Yesterday';
       for(let i=0;i<this.dateArray.length;i++){
         console.log(yesterdaydate == this.dateArray[i]);
        if(yesterdaydate == this.dateArray[i]){
        this.datePriorityStaffArray.push(this.staffArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityPayslipArray.push(this.payslipArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityTotalSumArray.push(this.totalPayslipSum[i]);
        this.datePriorityAllowanceSumArray.push(this.totalAllowanceSum[i]);
        this.datePriorityDeductionSumArray.push(this.totalDeductionSum[i]);
        this.datePriorityLooplenArray.push(this.looplenArray[i]);
        }
       }


            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
        
        this.createNameErpString();
         console.log(this.searchvalue);
        this.searchMethodNameErpString(this.searchvalue);
        this.getStatus(this.status);
        this.checkOverDueStatus();
     }
        //2018-05-31 2018-06-06 
     else if(this.selectDate == 'week'){
       this.byDate = 'This Week';
       for(let i=0;i<this.dateArray.length;i++){
         // let datecheck = this.dateArray[i].split('-');
         // let datenum = (new Date(+datecheck[0],(+datecheck[1]-1),+datecheck[2])).valueOf();
        if(this.dateArray[i]>=weekdate && this.dateArray[i]<=todaydate){
        this.datePriorityStaffArray.push(this.staffArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityPayslipArray.push(this.payslipArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityTotalSumArray.push(this.totalPayslipSum[i]);
        this.datePriorityAllowanceSumArray.push(this.totalAllowanceSum[i]);
        this.datePriorityDeductionSumArray.push(this.totalDeductionSum[i]);
        this.datePriorityLooplenArray.push(this.looplenArray[i]);
        }
       }

            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
            this.createNameErpString();
             console.log(this.searchvalue);
            this.searchMethodNameErpString(this.searchvalue);
            this.getStatus(this.status);

            this.checkOverDueStatus();
  
       
     }

    else if(this.selectDate == 'month'){
      this.byDate = 'This Month';
       for(let i=0;i<this.dateArray.length;i++){
         // let datecheck = this.dateArray[i].split('-');
         // let datenum = (new Date(+datecheck[0],(+datecheck[1]-1),+datecheck[2])).valueOf();
        if(this.dateArray[i]>=monthdate && this.dateArray[i]<=todaydate){
        this.datePriorityStaffArray.push(this.staffArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityPayslipArray.push(this.payslipArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityTotalSumArray.push(this.totalPayslipSum[i]);
        this.datePriorityAllowanceSumArray.push(this.totalAllowanceSum[i]);
        this.datePriorityDeductionSumArray.push(this.totalDeductionSum[i]);
        this.datePriorityLooplenArray.push(this.looplenArray[i]);
        
        }
       }


            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
            
            this.createNameErpString();
            console.log(this.searchvalue);
            this.searchMethodNameErpString(this.searchvalue);
            this.getStatus(this.status);
            this.checkOverDueStatus();
  
       
     }

    else{
            this.byDate = 'Show All';
            this.datePriorityStaffArray = this.staffArray.slice();
            this.datePriorityIdArray = this.idArray.slice();
            this.datePriorityDateArray = this.dateArray.slice();
            this.datePriorityPayslipArray = this.payslipArray.slice();
            this.datePriorityAllowanceSumArray = this.totalAllowanceSum.slice();
            this.datePriorityDeductionSumArray = this.totalDeductionSum.slice();
            this.datePriorityLooplenArray = this.looplenArray.slice();
            this.datePriorityTotalSumArray = this.totalPayslipSum.slice();
            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
            
            this.createNameErpString();
            this.searchMethodNameErpString(this.searchvalue);
            this.getStatus(this.status);
            this.checkOverDueStatus();
  
    }  

    }
    
   }

 createNameErpString(){
   // for(i=0;i<this.filteredStaffArray.length;i++){
   //   this
   // }
   // this.filteredStaffArray = [];
   //  this.filteredDateArray = [];
   //  this.filteredpayslipArray = [];
   //  this.filteredIdArray = [];
   //  this.filteredFeeSumArray = [];
   this.nameErpStringArray = [];
   console.log("filtered List:",this.filteredStaffArray);
   this.nameErpStringArray = this.filteredStaffArray.map((staff)=>{
     return (staff.staff.name.toLowerCase() + staff.staff.erp_id.toLowerCase());

   });
   console.log("nameErpString:",this.nameErpStringArray);
 
 }


 changeStatus(value,index){
   console.log(index);
   let idIndex = [];
    let id = this.filteredIdArray[index];
    console.log("id for change status:",id);
    console.log("value:",value);
    
       
       this.http.post(this.url+ '/payroll/payroll_edit_' + this.staff,{
         _id: id,
         staff_id: this.filteredStaffArray[index]['staff']['_id'],
         status: value,
         session: this.session,
         access_token: this.cookie
       }).subscribe((editedPayslip:any)=>{
         editedPayslip = editedPayslip.json();
         console.log(editedPayslip);
         this.http.post(this.url + '/payroll/get_payroll_'+this.staff+'_one',{
           _id: id,
           access_token: this.cookie
         }).subscribe((editedPayslipDoc:any)=>{
           editedPayslipDoc = editedPayslipDoc.json();
           console.log("editedPayslipDoc:",editedPayslipDoc);
            _.each(this.staffList,(payslip,index)=>{
           if(payslip['_id'] == editedPayslipDoc._id){
             idIndex.push(index);

           }
         })

          console.log("IdIndex:",idIndex);
          this.staffList[idIndex[0]] = editedPayslipDoc;
          console.log(this.staffList[idIndex[0]])
          console.log(this.staffList)
          this.staffArray = [];
          this.dateArray = [];
          this.payslipArray = [];
          this.idArray = [];
          this.totalFeeSum = [];
            console.log('before editing');
            console.log("FeeSum:", this.payslipArray);
            console.log('StaffArray:',this.staffArray);
            console.log('idArray:',this.idArray);
            console.log('dateArray:',this.dateArray);
            console.log('payslipArray:',this.payslipArray);
            console.log('totalFeeSum:',this.totalFeeSum);

          for(let i=0;i<this.staffList.length;i++){

                 for(let j=0;j<this.staffList[i].staffs.length;j++){
                  this.staffArray.push(this.staffList[i].staffs[j]);
                  this.idArray.push(this.staffList[i]._id);
                  this.dateArray.push(this.staffList[i].date);
                  this.payslipArray.push(this.staffList[i].salary[0]);
                  this.totalPayslipSum.push(this.payslipArray[i]);
                  this.totalAllowanceSum.push(this.allowanceSumArray[i]);
                  this.totalDeductionSum.push(this.deductionSumArray[i]);
                  this.looplenArray.push(this.looplenArrayMethod(this.staffList[i].salary[0]['allowances'].length>this.staffList[i].salary[0]['deductions'].length?
                                        this.staffList[i].salary[0]['allowances'].length:this.staffList[i].salary[0]['deductions'].length));
                 
                }
                           console.log("FeeSum:", this.payslipArray);
            console.log('StaffArray:',this.staffArray);
            console.log('idArray:',this.idArray);
            console.log('dateArray:',this.dateArray);
            console.log('payslipArray:',this.payslipArray);
            console.log('totalFeeSum:',this.totalFeeSum);
             }
            this.datePriorityStaffArray = this.staffArray.slice();
            this.datePriorityIdArray = this.idArray.slice();
            this.datePriorityDateArray = this.dateArray.slice();
            this.datePriorityPayslipArray = this.payslipArray.slice();
            this.datePriorityAllowanceSumArray = this.totalAllowanceSum.slice();
            this.datePriorityDeductionSumArray = this.totalDeductionSum.slice();
            this.datePriorityLooplenArray = this.looplenArray.slice();
            this.datePriorityTotalSumArray = this.totalPayslipSum.slice();
            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
             this.createNameErpString();
             this.getDate(this.selectDate);
             
             this.searchMethodNameErpString(this.searchvalue);
             this.getStatus(this.status);
             this.checkOverDueStatus();

         })
       })
       
    }
 


 searchMethodNameErpString(value){
    if(value){
    let count = 0;
    this.searchNameErpString = [];
    this.filteredStaffArray = [];
    this.filteredDateArray = [];
    this.filteredPayslipArray = [];
    this.filteredIdArray = [];
    this.filteredTotalSumArray = [];
    this.filteredAllowanceSumArray = [];
    this.filteredDeductionSumArray = [];
    value = value.toLowerCase();
    this.searchvalue = value;
    console.log('nameErpStringArray',this.nameErpStringArray);
     _.each(this.nameErpStringArray,(val:string,index)=>{
         if(val.includes(value)){
           this.searchNameErpString.push(index);
         }
    }) 

        
           
          
     
    console.log("searchNameErpString:",this.searchNameErpString);
    console.log('searchNameErpString:',this.searchNameErpString);
    for(let i=0;i<this.searchNameErpString.length;i++){
    this.filteredStaffArray.push(this.statusPriorityStaffArray[this.searchNameErpString[i]]); 
    this.filteredIdArray.push(this.statusPriorityIdArray[this.searchNameErpString[i]]);
    this.filteredDateArray.push(this.statusPriorityDateArray[this.searchNameErpString[i]]);
    this.filteredPayslipArray.push(this.statusPriorityPayslipArray[this.searchNameErpString[i]]);
    this.filteredTotalSumArray.push(this.statusPriorityTotalSumArray[this.searchNameErpString[i]]);
    this.filteredAllowanceSumArray.push(this.statusPriorityAllowanceSumArray[this.searchNameErpString[i]]);
    this.filteredDeductionSumArray.push(this.statusPriorityDeductionSumArray[this.searchNameErpString[i]]);
    this.filteredLooplenArray.push(this.statusPriorityLooplenArray[i]);
  }
   
}
else{


            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
}
 
}

removePayslip(index){
   console.log(index);
   let idIndex = [];
    let id = this.filteredIdArray[index];
    console.log("id for change status:",id);
   
    
       
       this.http.post(this.url+ '/payroll/payroll_remove_'+ this.staff,{
         _id: id,
         staff_id: this.filteredStaffArray[index]['staff']['_id'],
         access_token: this.cookie
       }).subscribe((editedFee:any)=>{
         editedFee = editedFee.json();
         this.payslipArray = [];
         this.staffArray = [];
         this.dateArray = [];
         this.idArray = [];
         this.totalPayslipSum = [];
          this.totalAllowanceSum = [];
           this.totalDeductionSum = [];
           this.looplenArray = [];
         console.log(editedFee);
        this.http.post((this.url + '/payroll/get_payroll_for_'+ this.staff + '_all'),{ access_token: this.cookie,session: this.session})
    .subscribe((staff)=>{
      console.log(staff.json());
       
      this.staffList = staff.json();
      for(let staff of this.staffList){
           let allowanceSum =  +(_.pluck(staff.salary[0]['allowances'], 'amount')).reduce((acc,val)=>{

                return (+acc) + (+val);
              })
             this.allowanceSumArray.push(allowanceSum);

            }

     for(let staff of this.staffList){
           let  deductionSum =  +(_.pluck(staff.salary[0]['deductions'], 'amount')).reduce((acc,val)=>{

                return (+acc) + (+val);
              })
             this.deductionSumArray.push(deductionSum);

            }
   // //this.netSalaryInWords = number2text(this.netSalary);
   // for(let ){
   //   this.looplen =  (this.payslip.allowances.length>this.payslip.deductions.length?this.payslip.allowances.length:this.payslip.deductions.length)
   //   this.loopLenArray = this.looplenArrayMethod(this.looplen); 
   // }
  
     for(let i=0;i<this.staffList.length;i++){

                for(let j=0;j<this.staffList[i].staffs.length;j++){

                 this.staffArray.push(this.staffList[i].staffs[j]);
                 this.idArray.push(this.staffList[i]._id);
                 this.dateArray.push(this.staffList[i].date);
                 this.payslipArray.push(this.staffList[i].salary[0]);
                 this.totalAllowanceSum.push(this.allowanceSumArray[i]);
                 this.totalDeductionSum.push(this.deductionSumArray[i]);
                 this.totalPayslipSum.push(+this.staffList[i].salary[0]['basic_sal']+this.allowanceSumArray[i] - this.deductionSumArray[i]);
                 this.looplenArray.push(this.looplenArrayMethod(this.staffList[i].salary[0]['allowances'].length>this.staffList[i].salary[0]['deductions'].length?
                                        this.staffList[i].salary[0]['allowances'].length:this.staffList[i].salary[0]['deductions'].length));
               } 
            }

            this.rowsOnPage = this.staffList.length;
            this.datePriorityStaffArray = this.staffArray.slice();
            this.datePriorityIdArray = this.idArray.slice();
            this.datePriorityDateArray = this.dateArray.slice();
            this.datePriorityPayslipArray = this.payslipArray.slice();
            this.datePriorityAllowanceSumArray = this.totalAllowanceSum.slice();
            this.datePriorityDeductionSumArray = this.totalDeductionSum.slice();
            this.datePriorityLooplenArray = this.looplenArray.slice();
            this.datePriorityTotalSumArray = this.totalPayslipSum.slice();
            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
            this.createNameErpString();
            this.checkOverDueStatus();

         })
       })
       
    }

   printInvoice(){
     this.printDiv = true;

     setTimeout(()=>{
       print();
       this.printDiv=false;

     },1);
    
   }

dateDiffInDays(date1, date2) {
  let _MS_PER_DAY:number = 1000 * 60 * 60 * 24;
  console.log("date1:",date1)
  console.log("date2:",date2)

  let a = new Date(date1);
  let b = new Date(date2);
  console.log("a:",a)
  console.log("b:",b)
  // Discard the time and time-zone information.
  let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    console.log("utc1:",utc1)
  console.log("utc2:",utc2)
  console.log("dateDiff:",Math.floor((utc2 - utc1) / (_MS_PER_DAY)));
  return Math.floor((utc2 - utc1) /(_MS_PER_DAY));
}

checkOverDueStatus(){
  this.unpaidStatus = [];
  let overdueValue:any;
  for(let i=0;i<this.filteredStaffArray.length;i++){
   
   if(this.filteredStaffArray[i]['status'] == 'Unpaid'){
     overdueValue = this.dateDiffInDays(this.filteredDateArray[i],this.today);
     console.log(overdueValue);
     console.log(overdueValue> this.overdue)
     if(overdueValue> this.overdue){
    
     this.unpaidStatus.push('OverDue');
     }
   else{
     this.unpaidStatus.push('UnPaid')
   }
   }

   else{
     this.unpaidStatus.push('Paid');
   }
   
}
}



 downloadJSON2CSV(objArray)
    {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i]) {
                line += array[i][index] + ',';
            }

            // Here is an example where you would wrap the values in double quotes
            // for (var index in array[i]) {
            //    line += '"' + array[i][index] + '",';
            // }

            line.slice(0,line.length-1); 

            str += line + '\r\n';
        }
        open( "data:text/csv;charset=utf-8," + escape(str))
    }

exportCSV(){
  let objArray = [];
  let objString = '';
  for(let i=0;i<this.filteredStaffArray.length;i++){
      objArray.push({
        Date: this.dateArray[i],
        Staff: this.filteredStaffArray[i]['staff']['name'],
        ERP_ID:  this.filteredStaffArray[i]['staff']['erp_id'],
        Status:  this.filteredStaffArray[i]['status'],
        Allowances: this.filteredAllowanceSumArray[i],
        Deductions: this.filteredDeductionSumArray[i],
        Total: this.filteredTotalSumArray[i],


      })
  }

  objString = JSON.stringify(objArray);
  this.downloadJSON2CSV(objString);


}


showModal(){
  console.log(this.modalSmall);
  this.modalSmall['dialogClass']= 'modal-sm';
 this.modalSmall.show();

}

hideModal(){
  this.byDate = 'Custom';
  this.datePriorityStaffArray = [];
  this.datePriorityDateArray = [];
  this.datePriorityPayslipArray = [];
  this.datePriorityIdArray = [];
  this.datePriorityAllowanceSumArray = [];
  this.datePriorityDeductionSumArray = [];
  this.datePriorityTotalSumArray = [];
  this.modalSmall.hide();
  console.log("startDate",this.startDate);
  console.log("endDate",this.endDate);
  this.formattedStartDate = this.parseFormatter.format(this.startDate);
  this.formattedEndDate = this.parseFormatter.format(this.endDate);
    console.log("formattedstartDate",this.formattedStartDate);
  console.log("formattedendDate",this.formattedEndDate);
  for(let i=0;i<this.staffArray.length;i++){
    if(this.dateArray[i]>=this.formattedStartDate && this.dateArray[i]<=this.formattedEndDate){
        this.datePriorityStaffArray.push(this.staffArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityPayslipArray.push(this.payslipArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityTotalSumArray.push(this.totalPayslipSum[i]);
        this.datePriorityAllowanceSumArray.push(this.totalAllowanceSum[i]);
        this.datePriorityDeductionSumArray.push(this.totalDeductionSum[i]);
        }
       }

            this.statusPriorityStaffArray = this.datePriorityStaffArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityPayslipArray = this.datePriorityPayslipArray.slice();
            this.statusPriorityAllowanceSumArray = this.datePriorityAllowanceSumArray.slice();
            this.statusPriorityDeductionSumArray = this.datePriorityDeductionSumArray.slice();
            this.statusPriorityTotalSumArray = this.datePriorityTotalSumArray.slice();
            this.statusPriorityLooplenArray=this.datePriorityLooplenArray.slice();
            this.filteredStaffArray = this.statusPriorityStaffArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredPayslipArray = this.statusPriorityPayslipArray.slice();
            this.filteredAllowanceSumArray = this.statusPriorityAllowanceSumArray.slice();
            this.filteredDeductionSumArray = this.statusPriorityDeductionSumArray.slice();
            this.filteredTotalSumArray = this.statusPriorityTotalSumArray.slice();
            this.filteredLooplenArray=this.statusPriorityLooplenArray.slice();
        this.createNameErpString();
         console.log(this.searchvalue);
        this.searchMethodNameErpString(this.searchvalue);
        this.getStatus(this.status);
        this.checkOverDueStatus();
  
}

 looplenArrayMethod(count:number){
     let arr = [];
     for(let i=0;i<count;i++){
       arr.push(i);
     }
     console.log(arr);
     return arr;
 }
  
 //Lastly i was correcting swal to take custom input date;

      
}
