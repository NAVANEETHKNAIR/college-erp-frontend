import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
import { SystemService } from '../system/service.system';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})


export class ExamComponent implements OnInit, AfterViewInit {
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
public url:any = 'http://localhost:3000';
public class_ref: any;
public subjectList:any =  [];
public id:any;
public fetch:boolean = false;

  constructor(public http: Http,public fetchsession:SystemService, public parseFormatter:NgbDateParserFormatter,public datePickerService:NgbDatepickerConfig) {
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    this.initializeForm();
    
  });
   var now = moment();
 
    console.log(this.datePickerService);
    this.date = this.parseFormatter.format({day:now.date(),month:now.month()+1,year:now.year()});
    this.datePickerService.maxDate = {day:now.date(),month:now.month()+1,year:now.year()}
       
    
   this.initializeForm();
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

  ngAfterViewInit(){
    this.http.post(this.url +  '/subject/subject_get_all',{})
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
    this.http.post(this.url + '/exam/exam_get_class',{class_ref:this.class_ref,session:this.session})
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

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  initializeForm(){
    this.examForm = new FormGroup({
      "name" : new FormControl(this.name,Validators.required),
      "date" : new FormControl(this.date,Validators.required),
      "subject_ref" : new FormControl(this.subject_ref, Validators.required),
      "total_marks": new FormControl(this.total_marks, Validators.required),
      "duration" : new FormControl(this.duration,Validators.required),
      "session" : new FormControl(this.session,Validators.required)
    })
  }

  addExam(){
    this.editMode = false;
    this.id  = '';
    this.name = '';
    this.date = '';
    this.subject_ref = '';
    this.total_marks = '';
    this.duration = '';
    
    this.initializeForm();
    this.openMyModal('effect-13');
  }

  editExam(index){
   this.editMode =true;
   this.id =this.examList[index]['_id']; 
   this.name = this.examList[index]['name'];
   this.date = this.examList[index]['date'];
   this.subject_ref = this.examList[index]['subject_ref']['name'];
   this.total_marks = this.examList[index]['total_marks'];
   this.duration = this.examList[index]['duration'];
   
   this.initializeForm();
   this.openMyModal('effect-13');
  }


  putExam(value){
    
      this.http.post(this.url + '/exam/exam',{
        name: value.name,
        date: value.date,
        class_ref: this.class_ref,
        subject_ref: _.where(this.subjectList,{name: value.subject_ref})[0]['_id'],
        total_marks: value.total_marks,
        duration: value.duration,
        session: this.session
      }).subscribe((savedExam)=>{
         this.http.post(this.url + '/exam/exam_get_class',{class_ref:this.class_ref,session:this.session})
               .subscribe((exam)=>{
                 this.examList = exam.json();
               })
      })
  }


 putExamEdited(value){
    
      this.http.post(this.url + '/exam/exam_edit',{
         _id: this.id,
        name: value.name,
        date: value.date,
        class_ref: this.class_ref,
        subject_ref: _.where(this.subjectList,{name: value.subject_ref})[0]['_id'],
        total_marks: value.total_marks,
        duration: value.duration,
        session: this.session
      }).subscribe((savedExam)=>{
         this.http.post(this.url + '/exam/exam_get_class',{class_ref:this.class_ref,session:this.session})
               .subscribe((exam)=>{
                 this.examList = exam.json();
               })
      })
  }


  
 
}


