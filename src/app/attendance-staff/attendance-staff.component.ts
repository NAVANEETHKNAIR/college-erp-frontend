import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-staff',
  templateUrl: './attendance-staff.component.html',
  styleUrls: ['./attendance-staff.component.scss']
})
export class AttendanceStaffComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public staffList:any = [];
public selectStaff:any;
public staffForm:FormGroup;
public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER STAFF'];
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
  constructor(public http: Http, public parseFormatter:NgbDateParserFormatter,public datePickerService:NgbDatepickerConfig) {
  //this.initializeForm();
  var now = moment();
  //console.log(now);
    console.log(this.datePickerService);
    this.date = this.parseFormatter.format({day:now.date(),month:now.month()+1,year:now.year()});
    this.datePickerService.maxDate = {day:now.date(),month:now.month()+1,year:now.year()}
       

}

  ngOnInit() {

  }

  getStaffMethod(value){
  this.staffList = [];
  this.checkStatus = [];
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
    if(this.staffTypeValue == 'TEACHER'){
      this.urladd = '/attendance/attendance_teacher_all';
      //this.type = 'TEACHER';
    }

    else if(this.staffTypeValue == 'ACCOUNTANT'){
      this.urladd = '/attendance/attendance_accountant_all';
      //this.type = 'ACCOUNTANT';
    }

    else if(this.staffTypeValue == 'LIBRARIAN'){
      this.urladd = '/attendance/attendance_librarian_all';
      //this.type = 'LIBRARIAN';
    }

    else{
      this.urladd = '/attendance/attendance_other_all';
      //this.type = 'OTHERSTAFF';
    }
    this.staffList = [];
    this.checkStatus = [];
    this.attendanceStatus = [];

    this.http.post((this.url+ this.urladd),{
      //class_ref:this.class_ref,
      date: this.date,
      session: "2018"
    }).subscribe((attendance:any)=>{
      console.log(attendance.json())
        console.log(attendance.json().length)
      if(attendance.json().length){
          attendance = attendance.json();
             
         this.finalize = attendance[0].finalize;
         console.log(this.finalize);
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
          console.log("getStaffMethod value:",this.staffTypeValue);
         if(this.staffTypeValue == 'TEACHER'){
            this.urladd = '/teacher/teacher_get_all';
            //this.type = 'TEACHER';
          }

          else if(this.staffTypeValue == 'ACCOUNTANT'){
            this.urladd = '/accountant/acountant_get_all';
            //this.type = 'ACCOUNTANT';
          }

          else if(this.staffTypeValue == 'LIBRARIAN'){
            this.urladd = '/librarian/librarian_get_all';
            //this.type = 'LIBRARIAN';
          }

          else{
            this.urladd = '/otherstaff/otherstaff_get_all';
            //this.type = 'OTHERSTAFF';
          }

    // // this.http.post((this.url + this.urladd),{})
    // // .subscribe((staff)=>{
    // //   console.log(staff.json());
    // //   this.staffList = staff.json();
    // //   //this.rowsOnPage = this.staffList.length();
    // })
         this.finalize = false;
         this.http.post(this.url + this.urladd ,{})
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
        })
      }
    })
  }

 selectDate(value){
   console.log(value);
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
    for(let i=0;i<this.staffList.length;i++){
      this.sendAttendanceStatus[i] = {staff:this.staffList[i]['staff']['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url + '/attendance/attendance_' + this.staffTypeValue.toLowerCase()),{
      
      "date": this.date,
      "staffs" : this.sendAttendanceStatus,
      "finalize":false,
      "session":"2018"
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
      "session":"2018"
  }).subscribe((attendance_staff)=>{
    console.log(attendance_staff.json());

  })
}
}

reviseStatus(){
  this.finalize = false;
}

finalizeStatus(){
  this.finalize = true;
  if(this.savedAttendance){
    for(let i=0;i<this.staffList.length;i++){
      this.sendAttendanceStatus[i] = {staff:this.staffList[i]['staff']['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url + '/attendance/attendance_' + this.staffTypeValue.toLowerCase()),{
      "date": this.date,
      "staffs" : this.sendAttendanceStatus,
      "finalize":true,
      "session":"2018"
  }).subscribe((attendance_staff)=>{
    console.log(attendance_staff.json());

  })
}

else{
  for(let i=0;i<this.staffList.length;i++){
      this.sendAttendanceStatus[i] = {staff:this.staffList[i]['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url + '/attendance/attendance_' + this.staffTypeValue.toLowerCase()),{
     
      "date": this.date,
      "staffs" : this.sendAttendanceStatus,
      "finalize":true,
      "session":"2018"
  }).subscribe((attendance_staff)=>{
    console.log(attendance_staff.json());

  })
}
}
}