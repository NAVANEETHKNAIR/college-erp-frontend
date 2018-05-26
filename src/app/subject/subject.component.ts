import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public subjectList:any;
public subjectForm: FormGroup;
public name:any = '';
public session:any = '';
public url:any = 'http://localhost:3000';
public allSubject:any;
public editMode:boolean;
public id:any;
public cookie:any;
  constructor(public http: Http,private cookieService: CookieService) {
  this.cookie = this.cookieService.getAll()['cookieSet'];
  this.initializeForm();


}

ngOnInit() {
     this.getallSubject();
  }
  
getallSubject(){
 this.http.post((this.url+'/subject/subject_get_all'),{ access_token: this.cookie})
 .subscribe((subject)=>{
   console.log(subject.json());
   this.allSubject = subject.json();
   this.subjectList = _.pluck(this.allSubject,'name');
 });
}
  
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  initializeForm(){
   this.subjectForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
  		"session": new FormControl(this.session,Validators.required)
   });
  }
  
  putSubject(value){
  	 console.log(value);
 
  	// let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post((this.url+'/subject/subject'),{
    	"name":value.name,
      "session": this.session,
      "access_token": this.cookie


    }).subscribe((subject:any)=>{
        this.getallSubject();
           // this.getStaffMethod(value.type);
              	   
        });    
  }

  putEditedSubject(value){
    console.log(value);

    this.http.post((this.url+ '/subject/subject_edit'),{
      "_id":this.id,
      "name":value.name,
      "session": this.session,
      "access_token": this.cookie

    }).subscribe((editedSubject)=>{
      console.log(editedSubject.json());
      this.getallSubject();

    })
  }



  addSubject(){
  	  this.editMode = false;     
  	  this.name = '';
      this.initializeForm();
      console.log(this.subjectForm);
      this.openMyModal('effect-13');

    

  }

  editSubject(index){
     this.editMode = true;
     this.id = (this.allSubject[index])._id;
  	 this.name = (this.allSubject[index]).name;
        this.initializeForm();
        console.log(this.subjectForm);
        this.openMyModal('effect-13');
  }
}
