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
  selector: 'app-marks-report',
  templateUrl: './marks-report.component.html',
  styleUrls: ['./marks-report.component.scss']
})


export class MarksReportComponent implements OnInit, AfterViewInit {
//@ViewChild('t') t:ElementRef;



//public checkStatus:any= [];
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
public user:any;
public user_id:any;
  //import { SystemService } from '../system/service.system';
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
   
      let class_ref = userDetail.class_ref;
      let student_id = userDetail._id
      this.http.post(this.url + '/marks/marks_get_for_student_ref',{class_ref:class_ref,student_id:student_id,session:this.session,access_token:this.cookie})
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
    this.http.post(this.url + '/exam/exam_get_class',{class_ref:this.class_ref,session:this.session, access_token:this.cookie})
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
   this.exam_ref = this.examList[i]['_id'];
   this.http.post(this.url+ '/student/students_get_for_class_ref',{class_ref:this.class_ref,session:this.session,access_token:this.cookie})
    .subscribe((students)=>{
   let studentsArray:any[] = students.json();
   this.studentList = _.map(studentsArray,(student)=>{
     this.studentArray.push(student._id);
     console.log("examList:",this.examList[this.index]);
     return {name:student.name,erp_id:student.erp_id,totalMarks:+this.examList[this.index]['total_marks'],marks_obtained:0}
   })
   
   this.rows = [...this.studentList];

   this.http.post(this.url+ '/marks/marks_get_for_exam_ref',{
     exam_ref:this.exam_ref,
     session:this.session,
     access_token: this.cookie
   }).subscribe((marks:any)=>{
      marks = marks.json();
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

  saveMarks(){

     let students = [];
    for(let i=0;i<this.studentList.length;i++){
       if(!this.marksArray[i]){
         this.marksArray[i] = 0;
         
       }

       students.push({student:this.studentArray[i],marks:this.marksArray[i]})

    }

    this.http.post(this.url+ '/marks/marks',{
      exam_ref:this.exam_ref,
      students: students,
      session: this.session,
      access_token: this.cookie
    }).subscribe((marks)=>{
       console.log(marks);
       this.editMarks = false;
      
    })

  }

  cancelMarks(){
    this.editMarks =false;
  }

}


