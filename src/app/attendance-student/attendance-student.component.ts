import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-attendance-student',
  templateUrl: './attendance-student.component.html',
  styleUrls: ['./attendance-student.component.scss']
})


export class AttendanceStudentComponent implements OnInit {
@ViewChild('t') t:ElementRef;



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
public url:any = 'http://localhost:3000';
public class_ref: any;
public date:any;
public datenow:any;
public fetch:boolean;
public sendAttendanceStatus:any = [];
public savedAttendance = false; 


  constructor(public http: Http, public parseFormatter:NgbDateParserFormatter,public datePickerService:NgbDatepickerConfig ) {
  //this.initializeForm();
  var now = moment();
  //console.log(now);
    console.log(this.datePickerService);
    this.date = this.parseFormatter.format({day:now.date(),month:now.month()+1,year:now.year()});
    this.datePickerService.maxDate = {day:now.date(),month:now.month()+1,year:now.year()}
       
    
}

  ngOnInit() {

    
     
    this.http.post(this.url + '/newClass/get_class_all',{})
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
    this.attendanceStatus = [];
    this.http.post((this.url+ '/attendance/attendance_student_get_for_class_ref'),{
      class_ref:this.class_ref,
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
         this.http.post(this.url + '/student/students_get_for_class_ref',{class_ref:this.class_ref})
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
      "session":"2018"
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
      "session":"2018"
  }).subscribe((attendance_student)=>{
    console.log(attendance_student.json());

  })
}
}

reviseStatus(){
  this.finalize = false;
}

finalizeStatus(){
  this.finalize = true;
  if(this.savedAttendance){
    for(let i=0;i<this.studentList.length;i++){
      this.sendAttendanceStatus[i] = {student:this.studentList[i]['student']['_id'],status:this.attendanceStatus[i]} 
    }
    
   this.http.post((this.url + '/attendance/attendance_student'),{
      "class_ref":this.class_ref,
      "date": this.date,
      "students" : this.sendAttendanceStatus,
      "finalize":true,
      "session":"2018"
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
      "finalize":true,
      "session":"2018"
  }).subscribe((attendance_student)=>{
    console.log(attendance_student.json());

  })
}
}
}


