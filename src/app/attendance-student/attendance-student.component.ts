import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ng2-cookies';
import { SystemService } from '../system/service.system';
//private cookieService: CookieService
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-attendance-student',
  templateUrl: './attendance-student.component.html',
  styleUrls: ['./attendance-student.component.scss']
})


export class AttendanceStudentComponent implements OnInit {
//@ViewChild('t') t:ElementRef;


@ViewChild('modalSmall') modalSmall:any;
public checkStatus:any= [];
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public getClassAll:any;
public selectClass:any;
public selectSection:any;
public studentList:any = [];
public filterClass:any;
public getSectionOfClass:any;
public studentForm:FormGroup;
public getSectionOfClassForm:any;
public getClassValue:any;
public erp_id:any = '';
public student_contact:any = '';
public parent_contact:any = '';
public class:any = '';
public section: any = '';
public editMode:boolean;
public session:any = '';
public attendanceStatus:any = [];
public finalize:boolean = false;
public url:any = 'http://159.89.171.240:3000';
public class_ref: any;
public date:any;
public datenow:any;
public fetch:boolean;
public sendAttendanceStatus:any = [];
public savedAttendance = false; 
public cookie:any;
public currentSession:any;
public studentSendSMS:any[] = [];
public time:any;
  constructor(public http: Http, public parseFormatter:NgbDateParserFormatter,public fetchsession:SystemService,public datePickerService:NgbDatepickerConfig,private cookieService: CookieService) {
  this.cookie = this.cookieService.getAll()['cookieSet'];
  var now = moment();
  
    console.log(this.datePickerService);
    this.date = this.parseFormatter.format({day:now.date(),month:now.month()+1,year:now.year()});
    this.datePickerService.maxDate = {day:now.date(),month:now.month()+1,year:now.year()}
    this.fetchsession.getSession().subscribe((session)=>{
      this.currentSession = session.session;
    this.session = this.fetchsession.getReportSession();
    console.log("session from session service",this.session);
    console.log("cookie-set:",this.cookieService.getAll()['cookieSet']);
    

})
}

  ngOnInit() {

    
     
    this.http.post(this.url + '/newClass/get_class_all',{ access_token:this.cookie,session:this.session})
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
    this.class_ref = _.where(this.getClassAll,{name: this.selectClass, section: value})[0]['_id'];

    this.fetch = true;



  }

  fetchStudent(){
    this.studentList = [];
    this.checkStatus = [];
    this.sendAttendanceStatus = [];
    this.attendanceStatus = [];
    this.http.post((this.url+ '/attendance/attendance_student_get_for_class_ref'),{
      class_ref:this.class_ref,
      date: this.date,
      session: this.session,
      access_token: this.cookie
    }).subscribe((attendance:any)=>{
      console.log(attendance.json())
        console.log(attendance.json().length)
      if(attendance.json().length){
          attendance = attendance.json();
             
         this.finalize = attendance[0].finalize;
         console.log(this.finalize);
         this.savedAttendance = true;
         this.studentList = attendance[0].students;
         for(let i=0;i<this.studentList.length;i++){
           if(this.studentList[i]['status'] === 'Present'){
             this.attendanceStatus[i] = 'Present';
             this.checkStatus[i] = true
           }

           else{
             this.attendanceStatus[i] = 'Absent';
             this.checkStatus[i] = false;
           }



         }
      }

      else{
         this.savedAttendance = false;
         this.finalize = false;
         this.http.post(this.url + '/student/students_get_for_class_ref',{class_ref:this.class_ref,session:this.session,access_token: this.cookie})
        .subscribe((data)=>{
          console.log(data.json());

          this.studentList = data.json();
          if(typeof(this.studentList)!=='string'){
          for(let i=0;i<this.studentList.length;i++)
           
            {
              this.attendanceStatus[i] = "Absent";
              this.checkStatus[i] = false;
            }

          }
        })
      }
    })
  }

  getClassMethod(value){
    this.selectSection = '';
    this.studentList = [];
    this.checkStatus = [];
    this.sendAttendanceStatus = [];
    this.attendanceStatus = [];
    console.log(value);
    this.selectClass = value;
    this.getSectionOfClass = _.where(this.getClassAll,{name:this.selectClass});
    console.log("getSectionOfClass:",this.getSectionOfClass);
  }

   getClassMethodForm(value){
    console.log(value);
    // console.log(this.filterClass[(+(value.split(":")[0]))-1]);
    //Method for obtaining class from 1: LKG"
     // this.getClassValue = (value.split(": ")[1])|| value;
     this.getClassValue = value;
    //this.studentForm.controls['class'].setValue = this.getClassValue;
    this.getSectionOfClassForm = _.where(this.getClassAll,{name:this.getClassValue});
    console.log("getSectionOfClassForm:",this.getSectionOfClassForm);
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


 selectDate(value){
   console.log(value);
   this.studentList = [];
   this.sendAttendanceStatus = [];
   this.checkStatus = [];
   this.attendanceStatus = [];
   //console.log(this.datenow);

   this.date = this.parseFormatter.format(value);
   console.log(typeof(this.date));
 }

checkCheckbox(value,index){
     console.log(value);   
   if(value){
     this.attendanceStatus[index] = "Present";
   }

   else{
     this.attendanceStatus[index] = "Absent";
   }
  
}

saveStatus(){
  this.finalize = false;
  if(this.savedAttendance){
    for(let i=0;i<this.studentList.length;i++){
      this.sendAttendanceStatus[i] = {student:this.studentList[i]['student']['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url + '/attendance/attendance_student'),{
      "class_ref":this.class_ref,
      "date": this.date,
      "students" : this.sendAttendanceStatus,
      "finalize":false,
      "session":this.session,
      "access_token": this.cookie
  }).subscribe((attendance_student)=>{
    console.log(attendance_student.json());

  })
}

else{
  for(let i=0;i<this.studentList.length;i++){
      this.sendAttendanceStatus[i] = {student:this.studentList[i]['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url + '/attendance/attendance_student'),{
      "class_ref":this.class_ref,
      "date": this.date,
      "students" : this.sendAttendanceStatus,
      "finalize":false,
      "session":this.session,
      "access_token" : this.cookie
  }).subscribe((attendance_student)=>{
    console.log(attendance_student.json());

  })
}
}


showModal(){
  console.log(this.modalSmall);
  this.modalSmall.dialogClass= "'modal-sm'";
  this.modalSmall.show();

}

sendSMS(){
      let date:any;
     date = (new Date()).toLocaleString();
    date = date.split(",");
   let dateArr = date[0].split('/');
   (+dateArr[0] < 9)? (dateArr[0]= '0' + dateArr[0]):(dateArr[0]=dateArr[0])
    (+dateArr[1] < 9)? (dateArr[1]= '0' + dateArr[1]):(dateArr[1]=dateArr[1])
   this.date = (dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1]);
    this.time = date[1];
   this.fetchsession.getMSG91().subscribe((msg91)=>{
   if(msg91._id){
    this.http.post(this.url+ '/msg91/send_msg91_attendance_student',{
    msg91: msg91._id,
    students:this.studentSendSMS,
    date: this.date,
    access_token:this.cookie
  }).subscribe((messageRecieved:any)=>{
           console.log(messageRecieved.json())
           if(messageRecieved.json()){
            this.http.post(this.url + '/message/message',{
              messagebody: 'Sent Attendance Status Staff for date  ' + this.date,
              to:  _.pluck(this.studentSendSMS,'contact'),
              date : this.date,
              time: this.time,
              session: this.session,
              access_token: this.cookie

            }).subscribe((message)=>{
              console.log("Message sent successfully:",message.json());
            })
           }
          else{
            console.log("Message not sent successfully",messageRecieved.json());
          }

          console.log(messageRecieved);
         })
       }
     })
  
}


hideModal(){
  this.modalSmall.hide();
}

reviseStatus(){
  this.finalize = false;
}

finalizeStatus(){
  this.finalize = true;
  if(this.savedAttendance){
    for(let i=0;i<this.studentList.length;i++){
      this.sendAttendanceStatus[i] = {student:this.studentList[i]['student']['_id'],status:this.attendanceStatus[i]}
      this.studentSendSMS[i] = {name:this.studentList[i]['student']['name'],status:this.attendanceStatus[i],contact:this.studentList[i]['student']['parent_contact']} 
    }
    
   this.http.post((this.url + '/attendance/attendance_student'),{
      "class_ref":this.class_ref,
      "date": this.date,
      "students" : this.sendAttendanceStatus,
      "finalize":true,
      "session":this.session,
      "access_token": this.cookie
  }).subscribe((attendance_student)=>{
    console.log(attendance_student.json());
    this.modalSmall.show();

  })
}

else{
  for(let i=0;i<this.studentList.length;i++){
      this.sendAttendanceStatus[i] = {student:this.studentList[i]['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url + '/attendance/attendance_student'),{
      "class_ref":this.class_ref,
      "date": this.date,
      "students" : this.sendAttendanceStatus,
      "finalize":true,
      "session":this.session,
      "access_token": this.cookie
  }).subscribe((attendance_student)=>{
    console.log(attendance_student.json());
    this.modalSmall.show();

  })
}
}
}


