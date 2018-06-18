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

@Component({
  selector: 'app-fees-report',
  templateUrl: './fees-report.component.html',
  styleUrls: ['./fees-report.component.scss']
})
export class FeesReportComponent implements OnInit {
@ViewChild('modalSmall') modalSmall:any;
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public printDiv:boolean = false;
// public staffList:any;
// public selectStaff:any;
public classForm:FormGroup;
public section:any;
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
public students:any[] = [];
public class_ref:any;
public date:any;
public feesList:any;
public feeSumArray:any[] = [];
public studentArray:any[] = [];
public feeArray:any[] = [];
public dateArray:any[]= [];
public idArray:any[] = [];
public totalFeeSum:any[] = [];
public modalStudent:object;
public modalDate:any;
public modalFee:any;
public modalFeeSum:any;
public modalOpen:boolean = false;
public filteredStudentArray:any[] = [];
public filteredFeeArray:any[] = [];
public filteredDateArray:any[]= [];
public filteredIdArray:any[] = [];
public filteredFeeSumArray:any[] = [];
public datePriorityStudentArray:any = []
public datePriorityFeeArray:any[] = [];
public datePriorityDateArray:any[]= [];
public datePriorityIdArray:any[] = [];
public datePriorityFeeSumArray:any[] = [];
public statusPriorityStudentArray:any = []
public statusPriorityFeeArray:any[] = [];
public statusPriorityDateArray:any[]= [];
public statusPriorityIdArray:any[] = [];
public statusPriorityFeeSumArray:any[] = [];
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
    this.http.post(this.url + '/newClass/get_class_all',{ "access_token": this.cookie})
      .subscribe((data) => {
        console.log(data.json());
        this.getClassAll = data.json();
        let classArray:any
        this.filterClass= _.uniq(_.pluck(this.getClassAll,'name')); 
          
    
        console.log("filterCLass:",this.filterClass);
            let date = (new Date()).toLocaleDateString().split("/")    
           let todaydate = (date[2] + '-' + ((+date[0]<10)?'0'+date[0]:date[0]) + '-' + ((+date[1]<10)?'0'+date[1]:date[1]));
           this.today = todaydate;
      });
  }

  getSectionMethod(value){

    this.feeSumArray = [];
    this.datePriorityStudentArray = [];
    this.datePriorityDateArray = [];
    this.datePriorityFeeArray = [];
    this.datePriorityIdArray = [];
    this.datePriorityFeeSumArray = [];
    this.statusPriorityStudentArray = [];
    this.statusPriorityDateArray = [];
    this.statusPriorityFeeArray = [];
    this.statusPriorityIdArray = [];
    this.statusPriorityFeeSumArray = [];
    this.filteredStudentArray = [];
    this.filteredDateArray = [];
    this.filteredFeeArray = [];
    this.filteredIdArray = [];
    this.filteredFeeSumArray = [];
    this.studentArray = [];
    this.dateArray = [];
    this.feeArray = [];
    this.idArray = [];
    this.totalFeeSum = [];
    this.status = '';
    console.log('Before');
    console.log("FeeSum:", this.feeSumArray);
    console.log('studentArray:',this.studentArray);
    console.log('idArray:',this.idArray);
    console.log('dateArray:',this.dateArray);
    console.log('feeArray:',this.feeArray);
    console.log('totalFeeSum:',this.totalFeeSum);
    console.log(value);
   this.selectSection = value;
    console.log(this.selectClass);
    console.log('select section:',this.selectSection);
    this.result = _.where(this.getClassAll,{name: this.selectClass, section: value})[0];
    console.log(this.result._id);
    this.http.post(this.url + '/fees/get_fees_for_class_ref',{class_ref:this.result._id,access_token: this.cookie,session:this.session})
        .subscribe((data)=>{
          console.log(data.json());
          this.feesList = data.json();
          


          this.class_ref = this.result._id;
            this.rowsOnPage = this.feesList.length;
            for(let fee of this.feesList){
             let feeSum =  +(_.pluck(fee.fees, 'amount')).reduce((acc,val)=>{

                return (+acc) + (+val);
              })
             this.feeSumArray.push(feeSum);

            }

            for(let i=0;i<this.feesList.length;i++){

                for(let j=0;j<this.feesList[i].students.length;j++){
                 this.studentArray.push(this.feesList[i].students[j]);
                 this.idArray.push(this.feesList[i]._id);
                 this.dateArray.push(this.feesList[i].date);
                 this.feeArray.push(this.feesList[i].fees);
                 this.totalFeeSum.push(this.feeSumArray[i]);
 
               } 
            }


            this.datePriorityStudentArray = this.studentArray.slice();
            this.datePriorityIdArray = this.idArray.slice();
            this.datePriorityDateArray = this.dateArray.slice();
            this.datePriorityFeeArray = this.feeArray.slice();
            this.datePriorityFeeSumArray = this.totalFeeSum.slice();
            this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
            this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
            this.filteredStudentArray = this.statusPriorityStudentArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredFeeArray = this.statusPriorityFeeArray.slice();
            this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
            this.createNameErpString();
            this.checkOverDueStatus();



            console.log('after');
            console.log("FeeSum:", this.feeSumArray);
            console.log('studentArray:',this.studentArray);
            console.log('idArray:',this.idArray);
            console.log('dateArray:',this.dateArray);
            console.log('feeArray:',this.feeArray);
            console.log('totalFeeSum:',this.totalFeeSum);
             

        })
  }

   openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

   closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  getClassMethod(value){
    this.feeSumArray = [];
    this.datePriorityStudentArray = [];
    this.datePriorityDateArray = [];
    this.datePriorityFeeArray = [];
    this.datePriorityIdArray = [];
    this.datePriorityFeeSumArray = [];
    this.statusPriorityStudentArray = [];
    this.statusPriorityDateArray = [];
    this.statusPriorityFeeArray = [];
    this.statusPriorityIdArray = [];
    this.statusPriorityFeeSumArray = [];
    this.filteredStudentArray = [];
    this.filteredDateArray = [];
    this.filteredFeeArray = [];
    this.filteredIdArray = [];
    this.filteredFeeSumArray = [];
    this.studentArray = [];
    this.dateArray = [];
    this.feeArray = [];
    this.idArray = [];
    this.totalFeeSum = [];
    this.status = '';

    console.log(value);
    this.selectClass = value;
    this.getSectionOfClass = _.where(this.getClassAll,{name:this.selectClass});
    console.log("getSectionOfClass:",this.getSectionOfClass);
  }

  showFees(i){
     console.log(i);
    this.modalOpen = true;
    this.modalStudent = this.filteredStudentArray[i];
    this.modalFee = this.filteredFeeArray[i];
    this.modalDate = this.filteredDateArray[i];
    this.modalFeeSum = this.filteredFeeSumArray[i];
   console.log("modalStudent",this.modalStudent);
   console.log("modalFee",this.modalFee);
   console.log("modalDate",this.modalDate);
   console.log("modalFeeSum",this.modalFeeSum);
     this.openMyModal('effect-13');
  }

  getStatus(value){
    console.log('Get Status valid:',Boolean(value));
   if(value){
    this.statusPriorityStudentArray = [];
    this.statusPriorityDateArray = [];
    this.statusPriorityFeeArray = [];
    this.statusPriorityIdArray = [];
    this.statusPriorityFeeSumArray = [];
    this.filteredStudentArray = [];
    this.filteredDateArray = [];
    this.filteredFeeArray = [];
    this.filteredIdArray = [];
    this.filteredFeeSumArray = [];
    this.status = value;
    if(value == 'show'){
        this.byStatus = 'Show All';
        this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
        this.statusPriorityIdArray = this.datePriorityIdArray.slice();
        this.statusPriorityDateArray = this.datePriorityDateArray.slice();
        this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
        this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
        this.filteredStudentArray = this.statusPriorityStudentArray.slice();
        this.filteredIdArray = this.statusPriorityIdArray.slice();
        this.filteredDateArray = this.statusPriorityDateArray.slice();
        this.filteredFeeArray = this.statusPriorityFeeArray.slice();
        this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
        this.createNameErpString();
        this.searchMethodNameErpString(this.searchvalue);
        this.checkOverDueStatus();
        return;
    }
    this.byStatus = value;
    console.log('checking if it is running if show is given');
    console.log(value);
    
    for(let i=0;i<this.datePriorityStudentArray.length;i++){
      if(this.datePriorityStudentArray[i]['status'] == this.status){
        this.statusPriorityStudentArray.push(this.datePriorityStudentArray[i]);
        this.statusPriorityDateArray.push(this.datePriorityDateArray[i]);
        this.statusPriorityFeeArray.push(this.datePriorityFeeArray[i]);
        this.statusPriorityIdArray.push(this.datePriorityIdArray[i]);
        this.statusPriorityFeeSumArray.push(this.datePriorityFeeSumArray[i]);
      }
    }
            this.filteredStudentArray = this.statusPriorityStudentArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredFeeArray = this.statusPriorityFeeArray.slice();
            this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();

            this.createNameErpString();
            this.searchMethodNameErpString(this.searchvalue);
            this.checkOverDueStatus();
  
    console.log(this.statusPriorityStudentArray); 
   }
  }

  getDate(value){
    //dateFormat : 2018-06-04(YYYY-MM-DD) 2018-05
   
    if(value){
      this.datePriorityStudentArray = [];
    this.datePriorityDateArray = [];
    this.datePriorityFeeArray = [];
    this.datePriorityIdArray = [];
    this.datePriorityFeeSumArray = [];
    this.statusPriorityStudentArray = [];
    this.statusPriorityDateArray = [];
    this.statusPriorityFeeArray = [];
    this.statusPriorityIdArray = [];
    this.statusPriorityFeeSumArray = [];
    this.filteredStudentArray = [];
    this.filteredDateArray = [];
    this.filteredFeeArray = [];
    this.filteredIdArray = [];
    this.filteredFeeSumArray = [];
    
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
        this.datePriorityStudentArray.push(this.studentArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityFeeArray.push(this.feeArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityFeeSumArray.push(this.totalFeeSum[i]);
        }

       }

      this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
      this.statusPriorityIdArray = this.datePriorityIdArray.slice();
      this.statusPriorityDateArray = this.datePriorityDateArray.slice();
      this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
      this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
      this.filteredStudentArray = this.statusPriorityStudentArray.slice();
      this.filteredIdArray = this.statusPriorityIdArray.slice();
      this.filteredDateArray = this.statusPriorityDateArray.slice();
      this.filteredFeeArray = this.statusPriorityFeeArray.slice();
      this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
      
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
        this.datePriorityStudentArray.push(this.studentArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityFeeArray.push(this.feeArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityFeeSumArray.push(this.totalFeeSum[i]);
        }
       }

        this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
        this.statusPriorityIdArray = this.datePriorityIdArray.slice();
        this.statusPriorityDateArray = this.datePriorityDateArray.slice();
        this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
        this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
        this.filteredStudentArray = this.statusPriorityStudentArray.slice();
        this.filteredIdArray = this.statusPriorityIdArray.slice();
        this.filteredDateArray = this.statusPriorityDateArray.slice();
        this.filteredFeeArray = this.statusPriorityFeeArray.slice();
        this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
        
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
        this.datePriorityStudentArray.push(this.studentArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityFeeArray.push(this.feeArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityFeeSumArray.push(this.totalFeeSum[i]);
        }
       }
            this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
            this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
            this.filteredStudentArray = this.statusPriorityStudentArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredFeeArray = this.statusPriorityFeeArray.slice();
            this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
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
        this.datePriorityStudentArray.push(this.studentArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityFeeArray.push(this.feeArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityFeeSumArray.push(this.totalFeeSum[i]);
        
        }
       }

            this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
            this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
            this.filteredStudentArray = this.statusPriorityStudentArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredFeeArray = this.statusPriorityFeeArray.slice();
            this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
            
            this.createNameErpString();
            console.log(this.searchvalue);
            this.searchMethodNameErpString(this.searchvalue);
            this.getStatus(this.status);
            this.checkOverDueStatus();
  
       
     }

    else{
            this.byDate = 'Show All';
            this.datePriorityStudentArray = this.studentArray.slice();
            this.datePriorityIdArray = this.idArray.slice();
            this.datePriorityDateArray = this.dateArray.slice();
            this.datePriorityFeeArray = this.feeArray.slice();
            this.datePriorityFeeSumArray = this.totalFeeSum.slice();
            this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
            this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
            this.filteredStudentArray = this.statusPriorityStudentArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredFeeArray = this.statusPriorityFeeArray.slice();
            this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
            
            this.createNameErpString();
            this.searchMethodNameErpString(this.searchvalue);
            this.getStatus(this.status);
            this.checkOverDueStatus();
  
    }  

    }
    
   }

 createNameErpString(){
   // for(i=0;i<this.filteredStudentArray.length;i++){
   //   this
   // }
   // this.filteredStudentArray = [];
   //  this.filteredDateArray = [];
   //  this.filteredFeeArray = [];
   //  this.filteredIdArray = [];
   //  this.filteredFeeSumArray = [];
   this.nameErpStringArray = [];
   console.log("filtered List:",this.filteredStudentArray);
   this.nameErpStringArray = this.filteredStudentArray.map((student)=>{
     return (student.student.name.toLowerCase() + student.student.erp_id.toLowerCase());

   });
   console.log("nameErpString:",this.nameErpStringArray);
 
 }


 changeStatus(value,index){
   console.log(index);
   let idIndex = [];
    let id = this.filteredIdArray[index];
    console.log("id for change status:",id);
    console.log("value:",value);
    
       
       this.http.post(this.url+ '/fees/fees_edit',{
         _id: id,
         student_id: this.filteredStudentArray[index]['student']['_id'],
         document_id: this.filteredStudentArray[index]['_id'],
         status: value,
         session: this.session,
         access_token: this.cookie
       }).subscribe((editedFee:any)=>{
         editedFee = editedFee.json();
         console.log(editedFee);
         this.http.post(this.url + '/fees/get_fees_one',{
           _id: id,
           access_token: this.cookie
         }).subscribe((editedFeeDoc:any)=>{
           editedFeeDoc = editedFeeDoc.json();
           console.log("editedFeeDoc:",editedFeeDoc);
            _.each(this.feesList,(fee,index)=>{
           if(fee['_id'] == editedFeeDoc._id){
             idIndex.push(index);

           }
         })

          console.log("IdIndex:",idIndex);
          this.feesList[idIndex[0]] = editedFeeDoc;
          console.log(this.feesList[idIndex[0]])
          console.log(this.feesList)
          this.studentArray = [];
          this.dateArray = [];
          this.feeArray = [];
          this.idArray = [];
          this.totalFeeSum = [];
            console.log('before editing');
            console.log("FeeSum:", this.feeSumArray);
            console.log('studentArray:',this.studentArray);
            console.log('idArray:',this.idArray);
            console.log('dateArray:',this.dateArray);
            console.log('feeArray:',this.feeArray);
            console.log('totalFeeSum:',this.totalFeeSum);

          for(let i=0;i<this.feesList.length;i++){

                 for(let j=0;j<this.feesList[i].students.length;j++){
                  this.studentArray.push(this.feesList[i].students[j]);
                  this.idArray.push(this.feesList[i]._id);
                  this.dateArray.push(this.feesList[i].date);
                  this.feeArray.push(this.feesList[i].fees);
                  this.totalFeeSum.push(this.feeSumArray[i]);

                } 
             }
            console.log('after editing');
            console.log("FeeSum:", this.feeSumArray);
            console.log('studentArray:',this.studentArray);
            console.log('idArray:',this.idArray);
            console.log('dateArray:',this.dateArray);
            console.log('feeArray:',this.feeArray);
            console.log('totalFeeSum:',this.totalFeeSum);

             this.datePriorityStudentArray = this.studentArray.slice();
             this.datePriorityIdArray = this.idArray.slice();
             this.datePriorityDateArray = this.dateArray.slice();
             this.datePriorityFeeArray = this.feeArray.slice();
             this.datePriorityFeeSumArray = this.totalFeeSum.slice();
             this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
             this.statusPriorityIdArray = this.datePriorityIdArray.slice();
             this.statusPriorityDateArray = this.datePriorityDateArray.slice();
             this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
             this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
             this.filteredStudentArray = this.statusPriorityStudentArray.slice();
             this.filteredIdArray = this.statusPriorityIdArray.slice();
             this.filteredDateArray = this.statusPriorityDateArray.slice();
             this.filteredFeeArray = this.statusPriorityFeeArray.slice();
             this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
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
    this.filteredStudentArray = [];
    this.filteredDateArray = [];
    this.filteredFeeArray = [];
    this.filteredIdArray = [];
    this.filteredFeeSumArray = [];
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
    this.filteredStudentArray.push(this.statusPriorityStudentArray[this.searchNameErpString[i]]); 
    this.filteredIdArray.push(this.statusPriorityIdArray[this.searchNameErpString[i]]);
    this.filteredDateArray.push(this.statusPriorityDateArray[this.searchNameErpString[i]]);
    this.filteredFeeArray.push(this.statusPriorityFeeArray[this.searchNameErpString[i]]);
    this.filteredFeeSumArray.push(this.statusPriorityFeeSumArray[this.searchNameErpString[i]]);
  }
   
}
else{

       this.filteredStudentArray = this.statusPriorityStudentArray.slice();
       this.filteredIdArray = this.statusPriorityIdArray.slice();
       this.filteredDateArray = this.statusPriorityDateArray.slice();
       this.filteredFeeArray = this.statusPriorityFeeArray.slice();
       this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
}
 
}

removeFees(index){
   console.log(index);
   let idIndex = [];
    let id = this.filteredIdArray[index];
    console.log("id for change status:",id);
   
    
       
       this.http.post(this.url+ '/fees/fees_remove',{
         _id: id,
         student_id: this.filteredStudentArray[index]['student']['_id'],
         access_token: this.cookie
       }).subscribe((editedFee:any)=>{
         editedFee = editedFee.json();
         this.feeSumArray = [];
         this.studentArray = [];
         this.dateArray = [];
         this.feeArray = [];
         this.idArray = [];
         this.totalFeeSum = [];
         console.log(editedFee);
        this.http.post(this.url + '/fees/get_fees_for_class_ref',{class_ref:this.class_ref,access_token: this.cookie,session:this.session})
        .subscribe((data)=>{
          console.log(data.json());
          this.feesList = data.json();
          this.rowsOnPage = this.feesList.length;
            for(let fee of this.feesList){
             let feeSum =  +(_.pluck(fee.fees, 'amount')).reduce((acc,val)=>{

                return (+acc) + (+val);
              })
             this.feeSumArray.push(feeSum);

            }

            for(let i=0;i<this.feesList.length;i++){

                for(let j=0;j<this.feesList[i].students.length;j++){
                 this.studentArray.push(this.feesList[i].students[j]);
                 this.idArray.push(this.feesList[i]._id);
                 this.dateArray.push(this.feesList[i].date);
                 this.feeArray.push(this.feesList[i].fees);
                 this.totalFeeSum.push(this.feeSumArray[i]);

               } 
            }


            this.datePriorityStudentArray = this.studentArray.slice();
            this.datePriorityIdArray = this.idArray.slice();
            this.datePriorityDateArray = this.dateArray.slice();
            this.datePriorityFeeArray = this.feeArray.slice();
            this.datePriorityFeeSumArray = this.totalFeeSum.slice();
            this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
            this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
            this.filteredStudentArray = this.statusPriorityStudentArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredFeeArray = this.statusPriorityFeeArray.slice();
            this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();

            this.createNameErpString();
          


            console.log('after');
            console.log("FeeSum:", this.feeSumArray);
            console.log('studentArray:',this.studentArray);
            console.log('idArray:',this.idArray);
            console.log('dateArray:',this.dateArray);
            console.log('feeArray:',this.feeArray);
            console.log('totalFeeSum:',this.totalFeeSum);
             

   
             this.getDate(this.selectDate);
             this.searchMethodNameErpString(this.searchvalue);
             this.getStatus(this.status);
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
  for(let i=0;i<this.filteredStudentArray.length;i++){
   
   if(this.filteredStudentArray[i]['status'] == 'Unpaid'){
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
  for(let i=0;i<this.filteredStudentArray.length;i++){
      objArray.push({
        Date: this.dateArray[i],
        Student: this.filteredStudentArray[i]['student']['name'],
        ERP_ID:  this.filteredStudentArray[i]['student']['erp_id'],
        Status:  this.filteredStudentArray[i]['status'],
        Amount: this.filteredFeeSumArray[i]

      })
  }

  objString = JSON.stringify(objArray);
  this.downloadJSON2CSV(objString);


}


showModal(){
  console.log(this.modalSmall);
    this.modalSmall.dialogClass= "'modal-sm'";
 this.modalSmall.show();

}

hideModal(){
  this.byDate = 'Custom';
  this.datePriorityStudentArray = [];
  this.datePriorityFeeArray = [];
  this.datePriorityIdArray = [];
  this.datePriorityFeeSumArray = [];
  this.datePriorityDateArray = [];
 this.modalSmall.hide();
  console.log("startDate",this.startDate);
  console.log("endDate",this.endDate);
  this.formattedStartDate = this.parseFormatter.format(this.startDate);
  this.formattedEndDate = this.parseFormatter.format(this.endDate);
    console.log("formattedstartDate",this.formattedStartDate);
  console.log("formattedendDate",this.formattedEndDate);
  for(let i=0;i<this.studentArray.length;i++){
    if(this.dateArray[i]>=this.formattedStartDate && this.dateArray[i]<=this.formattedEndDate){
       this.datePriorityStudentArray.push(this.studentArray[i]);
        this.datePriorityDateArray.push(this.dateArray[i]);
        this.datePriorityFeeArray.push(this.feeArray[i]);
        this.datePriorityIdArray.push(this.idArray[i]);
        this.datePriorityFeeSumArray.push(this.totalFeeSum[i]);
    }
    
  }
            this.statusPriorityStudentArray = this.datePriorityStudentArray.slice();
            this.statusPriorityIdArray = this.datePriorityIdArray.slice();
            this.statusPriorityDateArray = this.datePriorityDateArray.slice();
            this.statusPriorityFeeArray = this.datePriorityFeeArray.slice();
            this.statusPriorityFeeSumArray = this.datePriorityFeeSumArray.slice();
            this.filteredStudentArray = this.statusPriorityStudentArray.slice();
            this.filteredIdArray = this.statusPriorityIdArray.slice();
            this.filteredDateArray = this.statusPriorityDateArray.slice();
            this.filteredFeeArray = this.statusPriorityFeeArray.slice();
            this.filteredFeeSumArray = this.statusPriorityFeeSumArray.slice();
            
            this.createNameErpString();
            this.searchMethodNameErpString(this.searchvalue);
            this.getStatus(this.status);
            this.checkOverDueStatus();
  
}


  
 //Lastly i was correcting swal to take custom input date;

      
}
