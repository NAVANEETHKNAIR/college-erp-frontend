import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-staff',
  templateUrl: './attendance-staff.component.html',
  styleUrls: ['./attendance-staff.component.scss']
})
export class AttendanceStaffComponent implements OnInit {
@ViewChild('modalSmall') modalSmall:any;
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public staffList:any = [];
public selectStaff:any;
public staffForm:FormGroup;
public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER'];
public session:any = '';
public url:any = 'http://localhost:3000';
public urladd:any;
public editMode:boolean;
public date:any;
public attendanceStatus:any = [];
public finalize:boolean = false;
public savedAttendance:boolean = false;
public checkStatus:any = [];
public staffTypeValue:any = '';
public sendAttendanceStatus:any = [];
public fetch:boolean = false;
public cookie:any;
public type:any;
public datemodel:any;
public currentSession:any;
public staffSendSMS:any[] = [];

  constructor(public http: Http, public parseFormatter:NgbDateParserFormatter,public fetchsession:SystemService,public datePickerService:NgbDatepickerConfig,private cookieService: CookieService) {
  //this.initializeForm();
  var now = moment();

 
  //console.log(now);
    console.log(this.datePickerService);
    //this.datemodel = {year:now.year(),month:now.month()+1,day:now.date()}
    
    this.date = this.parseFormatter.format({day:now.date(),month:now.month()+1,year:now.year()});
    //this.date = this.parseFormatter.format({year:now.year(),month:now.month()+1,day:now.date()});
    this.datePickerService.maxDate = {day:now.date(),month:now.month()+1,year:now.year()}
    //this.datePickerService.startDate = {month:1,year:now.year()} 
    this.fetchsession.getSession().subscribe((session)=>{
   this.currentSession = session.session;
    this.session = this.fetchsession.getReportSession();
    console.log("session from session service",this.session);
    console.log(this.cookieService.getAll()['cookieSet']);
    this.cookie = this.cookieService.getAll()['cookieSet'];

})
}


ngOnInit() {

  }

  getStaffMethod(value){
  this.staffList = [];
  this.checkStatus = [];
  this.sendAttendanceStatus = [];
  this.attendanceStatus = [];
  this.staffTypeValue = value;
  this.fetch = true;
  
    

   
  }


  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  
  }




  fetchStaff(){

    this.staffList = [];
    this.checkStatus = [];
    this.attendanceStatus = [];
    this.sendAttendanceStatus = [];
    let type = this.staffTypeValue.toLowerCase()
    this.http.post((this.url+ '/attendance/attendance_'+ type + '_all'),{

      date: this.date,
      session: this.session,
      access_token: this.cookie

    }).subscribe((attendance:any)=>{
      console.log(attendance.json())
        console.log("attendance:",attendance.json())
      if(attendance.json().length){
          attendance = attendance.json();
             
         this.finalize = attendance[0].finalize;
       
         this.savedAttendance = true;
         this.staffList = attendance[0].staffs;
         for(let i=0;i<this.staffList.length;i++){
           if(this.staffList[i]['status'] === 'Present'){
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
        this.staffList = [];
     
        this.checkStatus = [];
        this.attendanceStatus = [];
        this.sendAttendanceStatus = [];

         let staff = this.staffTypeValue.toLowerCase();
         this.finalize = false;
         this.http.post(this.url + '/' + staff + '/' + staff + '_get_all' ,{ session:this.session, access_token: this.cookie })
        .subscribe((data)=>{
          console.log(data.json());

          this.staffList = data.json();
          if(typeof(this.staffList)!=='string'){

          for(let i=0;i<this.staffList.length;i++)
           
            {
              this.attendanceStatus[i] = "Absent";
              this.checkStatus[i] = false;
            }

          }
        }
        )
      }
    })
  }

 selectDate(value){

   console.log(value);
  


   this.date = this.parseFormatter.format(value);
   console.log(this.date);
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
    for(let i=0;i<this.staffList.length;i++){
      this.sendAttendanceStatus[i] = {staff:this.staffList[i]['staff']['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url + '/attendance/attendance_' + this.staffTypeValue.toLowerCase()),{
      
      "date": this.date,
      "staffs" : this.sendAttendanceStatus,
      "finalize":false,
      "session":this.session,
      "access_token": this.cookie
  }).subscribe((attendance_staff)=>{
    console.log(attendance_staff.json());

  })
}

else{
  for(let i=0;i<this.staffList.length;i++){
      this.sendAttendanceStatus[i] = {staff:this.staffList[i]['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url  + '/attendance/attendance_' + this.staffTypeValue.toLowerCase()),{
      "date": this.date,
      "staffs" : this.sendAttendanceStatus,
      "finalize":false,
      "session":this.session,
      "access_token": this.cookie
  }).subscribe((attendance_staff)=>{
    console.log(attendance_staff.json());

  })
}
}

reviseStatus(){
  this.finalize = false;
}

showModal(){
  console.log(this.modalSmall);
  this.modalSmall.dialogClass= "'modal-sm'";
  this.modalSmall.show();

}

sendSMS(){
  this.fetchsession.getMSG91().subscribe((msg91)=>{
   if(msg91._id){
     this.http.post(this.url+ '/msg91/send_msg91_attendance_staff',{
    staffs:this.staffSendSMS,
    date: this.date,
    access_token:this.cookie
  }).subscribe((message)=>{
    console.log(message.json());
  })
   } 
  })
  
}


hideModal(){
  this.modalSmall.hide();
}


finalizeStatus(){
  this.finalize = true;
  this.showModal();
  if(this.savedAttendance){
    console.log("purana save hone se pehle staffList:",this.staffList);
    console.log("purana save hone se pehle checkList:",this.attendanceStatus);
    for(let i=0;i<this.staffList.length;i++){
      this.sendAttendanceStatus[i] = {staff:this.staffList[i]['staff']['_id'],status:this.attendanceStatus[i]}
      this.staffSendSMS[i] = {staff:this.staffList[i]['staff']['name'],status:this.attendanceStatus[i],contact:this.staffList[i]['staff']['phone']};
    }
    console.log("sendAttendanceStatus purana:",this.sendAttendanceStatus);
   this.http.post((this.url + '/attendance/attendance_' + this.staffTypeValue.toLowerCase()),{
      "date": this.date,
      "staffs" : this.sendAttendanceStatus,
      "finalize":true,
      "session":this.session,
      "access_token": this.cookie
  }).subscribe((attendance_staff)=>{
    console.log(attendance_staff.json());

  })
}

else{
  for(let i=0;i<this.staffList.length;i++){
      this.sendAttendanceStatus[i] = {staff:this.staffList[i]['_id'],status:this.attendanceStatus[i]} 
    }
    console.log("naya save hone se pehle staffList:",this.staffList);
    console.log(" naya save hone se pehle checkList:",this.attendanceStatus);

    
//  this.http.post((this.url + '/attendance/attendance_' + this.staffTypeValue.toLowerCase()),{
//     "date": this.date,
//     "staffs" : this.sendAttendanceStatus,
//     "finalize":true,
//     "session":this.session,
//     "access_token": this.cookie
// }).subscribe((attendance_staff)=>{
//   console.log(attendance_staff.json());

//})
}
}
}