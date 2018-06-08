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
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
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
    this.http.post(this.url + '/newClass/get_class_all',{ "access_token": this.cookie})
      .subscribe((data) => {
        console.log(data.json());
        this.getClassAll = data.json();
        let classArray:any
        this.filterClass= _.uniq(_.pluck(this.getClassAll,'name')); 
          

        console.log("filterCLass:",this.filterClass);
      });
  }

  getSectionMethod(value){
    console.log(value);
   this.selectSection = value;
    console.log(this.selectClass);
    console.log('select section:',this.selectSection);
    this.result = _.where(this.getClassAll,{name: this.selectClass, section: value})[0];
    console.log(this.result._id);
    this.http.post(this.url + '/student/students_get_for_class_ref',{class_ref:this.result._id,access_token: this.cookie,session:this.session})
        .subscribe((data)=>{
          console.log(data.json());
          this.studentList = data.json();
          this.class_ref = this.result._id;
            this.rowsOnPage = this.studentList.length;
            this.checkStatus = this.studentList.map((value)=>{
               return false;
            })

            

        })
  }

  getClassMethod(value){
    console.log(value);
    this.selectClass = value;
    this.getSectionOfClass = _.where(this.getClassAll,{name:this.selectClass});
    console.log("getSectionOfClass:",this.getSectionOfClass);
  }
  
   openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

   closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  proceed(){
    this.students = [];
    this.openMyModal('effect-13');
  }

  addFees(){
    (<FormArray>this.feesForm.controls['feesArray']).push(new FormGroup({
      "description": new FormControl("", Validators.required),
      "amount": new FormControl("", Validators.required)
    }))
  }

  deleteFees(i){
    (<FormArray>this.feesForm.controls['feesArray']).removeAt(i); 
  }

  generateFees(value){
    this.students = [];
    console.log(this.checkStatus);
    console.log(value);
    for(let i=0;i<=this.checkStatus.length;i++){
      if(this.checkStatus[i] == true){
        this.students.push({student:this.studentList[i]['_id'], status: 'Unpaid'})
      }
    }
    let date = (new Date()).toLocaleDateString().split("/")
    this.date = (date[2] + '-' + ((+date[0]<10)?'0'+date[0]:date[0]) + '-' + ((+date[1]<10)?'0'+date[1]:date[1]));
    this.http.post(this.url + '/fees/fees_create',{
      date: this.date,
      class_ref : this.class_ref,
      students: this.students,
      fees: value.feesArray,
      session: this.session,
      access_token: this.cookie

    }).subscribe((fees)=>{
      console.log(fees.json());
    })

  }

  initializeForm(){
    this.feesForm = new FormGroup({
      "feesArray":new FormArray([]),
      "date": new FormControl(""),
      "session": new FormControl(this.session, Validators.required)
    })
  }




}

 

