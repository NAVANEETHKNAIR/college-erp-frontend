import { Component, OnInit, AfterViewInit,ViewChild} from '@angular/core';
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
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})


export class MarksComponent implements OnInit, AfterViewInit {
//@ViewChild('t') t:ElementRef;



//public checkStatus:any= [];
@ViewChild('modalSmall') modalSmall:any;
public index:number;
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
public url:any = 'http://localhost:3000';
public class_ref: any;
public subjectList:any =  [];
public studentList:any = [];
public id:any;
public fetch:boolean = false;
public cookie:any;
public editMarks:boolean = false;
public rows:any[] = [];
public editing = {};
public marksArray:any[] = [];
public exam_ref:any;
public studentArray:any[] = [];
public studentContact:any[] = [];
public currentSession:any;
public subjectName:any;
public studentName:any[] = [];
public examName:any;

  //import { SystemService } from '../system/service.system';
  constructor(public http: Http,
    public fetchsession:SystemService, 
    public parseFormatter:NgbDateParserFormatter,
    public datePickerService:NgbDatepickerConfig,
    private cookieService: CookieService){
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    
      this.currentSession = session.session;
    this.session = this.fetchsession.getReportSession();
    console.log("session from session service",this.session);
    //this.initializeForm();
    console.log(this.examForm);
    
  });
   var now = moment();
 
    console.log(this.datePickerService);
    this.date = this.parseFormatter.format({day:now.date(),month:now.month()+1,year:now.year()});
    this.datePickerService.maxDate = {day:now.date(),month:now.month()+1,year:now.year()}
       
    
  
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

  ngAfterViewInit(){
    this.http.post(this.url +  '/subject/subject_get_all',{ "access_token": this.cookie})
       .subscribe((subject)=>{
          console.log(subject.json())
          this.subjectList = subject.json();

       })
  }

 getSectionMethod(value){
    this.fetch = true;
  	console.log(value);
 	this.selectSection = value;
  	console.log(this.selectClass);
  	console.log('select section:',this.selectSection);
    this.class_ref = _.where(this.getClassAll,{name: this.selectClass, section: value})[0]['_id'];
    this.http.post(this.url + '/exam/exam_get_class',{class_ref:this.class_ref,session:this.session,access_token:this.cookie})
        .subscribe((exam)=>{
          console.log(exam.json());
          this.examList = exam.json();
       })
    

}



 getClassMethod(value){
    this.fetch= false;
    this.selectSection = '';
    this.examList = [];
    console.log(value);
    this.selectClass = value;
    this.getSectionOfClass = _.where(this.getClassAll,{name:this.selectClass});
    console.log("getSectionOfClass:",this.getSectionOfClass);
  }

  openMyModal(event){
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event){
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
 
 addMarks(i){
   this.editMarks = true;
   this.index = i;
   this.subject_ref = this.examList[i]['subject_ref']['_id'];
   this.subjectName =  this.examList[i]['subject_ref']['name'];
   this.exam_ref = this.examList[i]['_id'];
   this.examName = this.examList[i]['title'];
   this.http.post(this.url+ '/student/students_get_for_class_ref',{class_ref:this.class_ref,session:this.session,access_token:this.cookie})
    .subscribe((students)=>{
   let studentsArray:any[] = students.json();
   this.studentList = _.map(studentsArray,(student)=>{
     this.studentArray.push(student._id);
     this.studentContact.push(student.parent_contact)
     this.studentName.push(student.name);
     console.log("examList:",this.examList[this.index]);
     return { name:student.name,erp_id:student.erp_id,totalMarks:+this.examList[this.index]['total_marks'],marks_obtained:0 }
   })
   
   this.rows = [...this.studentList];

   this.http.post(this.url+ '/marks/marks_get_for_exam_ref',{

     exam_ref:this.exam_ref,
     session:this.session,
     access_token: this.cookie
   }).subscribe((marks:any)=>{
      marks = marks.json();
      console.log("marks value:",marks);
      console.log("marks:",Boolean(marks));
      if(marks){
        this.studentList = [];
        for(let i=0;i<marks.students.length;i++){
          this.studentList.push({name:marks['students'][i]['student']['name'],
                                erp_id:marks['students'][i]['student']['erp_id'],
                                totalMarks:+this.examList[this.index]['total_marks'],
                                marks_obtained:marks['students'][i]['marks']})
        }
        this.rows = [...this.studentList];
        console.log('This line is not hit');
      }

   })

   console.log("List student:",this.studentList);
   console.log(this.rows);
 })

}

updateValue(event, cell, row) {
    this.editing[row + '-' + cell] = false;
    this.rows[row][cell] = event.target.value; 
    this.marksArray[row] = event.target.value;
    console.log("marksArray:",this.marksArray);

  }


   showModal(){
  console.log(this.modalSmall);
  this.modalSmall.dialogClass= "'modal-sm'";
 this.modalSmall.show();

}



sendSMS(){
  let students = [];
  for(let i=0;i<this.studentList.length;i++){
      students.push({contact:this.studentContact[i], marks:this.marksArray[i],name:this.studentName[i]})
  }
  this.fetchsession.getMSG91().subscribe((msg91)=>{
    this.http.post(this.url+ '/msg91/send_msg91_marks',{
     msg91:msg91._id,
     subject: this.subjectName,
     students:students,
     exam:this.examName,
     access_token:this.cookie
  }).subscribe((messageSent)=>{
    console.log(messageSent.json());
  })
  })
  
}



 hideModal(){

   this.modalSmall.hide();
 }

  saveMarks(){

     let students = [];
    for(let i=0;i<this.studentList.length;i++){
       if(!this.marksArray[i]){
         this.marksArray[i] = 0;
         
  }

       students.push({student:this.studentArray[i],marks:this.marksArray[i]})

    }

    this.http.post(this.url+ '/marks/marks',{
      subject_ref: this.subject_ref,
      class_ref:this.class_ref,
      exam_ref:this.exam_ref,
      students: students,
      session: this.session,
      access_token: this.cookie
    }).subscribe((marks)=>{
       console.log(marks);
       this.editMarks = false;
       this.showModal();
      
    })

  }

  cancelMarks(){
    this.editMarks =false;
  }

}


