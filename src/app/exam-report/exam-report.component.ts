import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.scss']
})


export class ExamReportComponent{
//@ViewChild('t') t:ElementRef;



//public checkStatus:any= [];
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public getClassAll:any;
public selectClass:any;
public selectSection:any;
public examList:any = [];
public filterClass:any;
public getSectionOfClass:any;
public examForm:FormGroup;
public getSectionOfClassForm:any;
public getClassValue:any;
public class:any = '';
public section: any = '';
public editMode:boolean;
public session:any = '';
public name:any;
public date:any;
public subject_ref:any;
public duration:any;
public total_marks:any;
public url:any = 'http://159.89.171.240:3000';
public class_ref: any;
public subjectList:any =  [];
public id:any;
public fetch:boolean = false;
public cookie:any;
public user:any;
public user_id:any;
public currentSession:any;
  constructor(public http: Http,
    public fetchsession:SystemService, 
    public parseFormatter:NgbDateParserFormatter,
    public datePickerService:NgbDatepickerConfig,
    private cookieService: CookieService){
     this.cookie = this.cookieService.getAll()['cookieSet'];
     this.user_id = this.cookieService.getAll()['idSet'];
     this.user = this.cookieService.getAll()['userSet'].toLowerCase();
   this.fetchsession.getSession().subscribe((session)=>{
    
    this.session = session.session;
    console.log("session from session service",this.session);
    
    console.log(this.examForm);
     if(this.user!=='admin'){


    this.http.post(this.url+ '/' + this.user + '/'+ this.user + '_get_for_user_id',{
          user_id: this.user_id,
          session: this.session,
          access_token: this.cookie
    }).subscribe((userDetail:any)=>{
      userDetail = userDetail.json();
      //let student_id = userDetail._id;
      let class_ref = userDetail.class_ref;
      this.http.post(this.url + '/exam/exam_get_class',{class_ref:class_ref,session:this.session, access_token:this.cookie})
        .subscribe((exam)=>{
          console.log(exam.json());
          this.examList = exam.json();
       

        })
   
   })
  
  }
    
  });

   var now = moment();
 
    console.log(this.datePickerService);
    this.date = this.parseFormatter.format({day:now.date(),month:now.month()+1,year:now.year()});
    this.datePickerService.maxDate = {day:now.date(),month:now.month()+1,year:now.year()}
       
    
   
  }




  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }




  
 
}


