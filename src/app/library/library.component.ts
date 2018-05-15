import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public bookList:any;
public bookForm: FormGroup;
public erp_id:any;
public title:any;
public assigned_from:any;
public assigned_to:any;
public notAssigned:boolean = true;
public assigned:boolean = false;
public assigned_duration:any;
public isbn:any;
public session:any = '';
public url:any = 'http://localhost:3000';
public allBook:any;
public editMode:boolean;
public id:any;
public invalidStudent:boolean = false;
public assigned_id:any;
  //import { SystemService } from '../system/service.system';
  constructor(public http: Http,public fetchsession:SystemService) {
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    this.initializeForm();
    
  });
   this.initializeForm();
  }

ngOnInit() {
     this.getAllBooks();

  }
  
getAllBooks(){
      this.http.post((this.url+ '/book/book_get_all'),{})
        .subscribe((book)=>{
          console.log(book.json());
          this.allBook = book.json();
        })
}

  
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  setValidation(value){
    console.log(this.bookForm);
    console.log(value);
    if(value == true){
        //this.notAssigned = false;
        this.assigned = true;
        this.bookForm.controls['assigned_from'].setValidators(Validators.required);
        this.bookForm.controls['assigned_to'].setValidators(Validators.required);
        this.bookForm.controls['assigned_duration'].setValidators(Validators.required);
        this.bookForm.controls["assigned_from"].updateValueAndValidity();
        this.bookForm.controls["assigned_to"].updateValueAndValidity();
        this.bookForm.controls["assigned_duration"].updateValueAndValidity();
        console.log(this.bookForm);
        //this.initializeForm();
       
    }

    if(value == false){
        this.assigned = false;
        this.bookForm.controls['assigned_from'].clearValidators();
        this.bookForm.controls['assigned_to'].clearValidators();
        this.bookForm.controls['assigned_duration'].clearValidators();
        this.bookForm.controls["assigned_from"].updateValueAndValidity();
        this.bookForm.controls["assigned_to"].updateValueAndValidity();
        this.bookForm.controls["assigned_duration"].updateValueAndValidity();
    }
  }

  initializeForm(){
   this.bookForm = new FormGroup({
  		"title": new FormControl(this.title,Validators.required),
      "isbn": new FormControl(this.isbn,Validators.required),
      "assigned_from": new FormControl(this.assigned_from),
      "assigned_to": new FormControl(this.assigned_to),
      "assigned_duration": new FormControl(this.assigned_duration),
      "assigned": new FormControl(this.assigned),
  		"session": new FormControl(this.session,Validators.required)
   });
  }


  
  putBook(value){
  	 console.log(value);
     // if(value.assigned_to == ''){
     //   value.assigned_to = undefined;
     // }

     // if(value.assigned_from == ''){
     //   value.assigned_from = undefined;
     // }

     // if(value.assigned_duration == ''){
     //   value.assigned_duration = undefined;
     // }
  	// let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    if(this.assigned){
      this.http.post((this.url+'/book/book'),{
      
      "title": value.title,
      "isbn": value.isbn,
      "assigned_to": this.assigned_id._id,
      "assigned": this.assigned,
      "assigned_from": value.assigned_from,
      "assigned_duration": value.assigned_duration,
      "session": this.session


    }).subscribe((book:any)=>{
        this.getAllBooks();
           // this.getStaffMethod(value.type);
                   
        });
    }

    else{
      this.http.post((this.url+'/book/book'),{
      
      "title": value.title,
      "isbn": value.isbn,
      "assigned": this.assigned,
      "session": this.session


    }).subscribe((book:any)=>{
        this.getAllBooks();
           // this.getStaffMethod(value.type);
                   
        });

    }
        
  }

  putEditedBook(value){
    console.log(value);
        console.log(value);
     // if(value.assigned_to == ''){
     //   value.assigned_to = undefined;
     // }

     // if(value.assigned_from == ''){
     //   value.assigned_from = undefined;
     // }

     // if(value.assigned_duration == ''){
     //   value.assigned_duration = undefined;
     // }
    if(this.assigned){
      this.http.post((this.url+ '/book/book_edit'),{
      "_id": this.id,
      "title": value.title,
      "isbn": value.isbn,
      "assigned_to": this.assigned_id._id,
      "assigned": value.assigned,
      "assigned_from": value.assigned_from,
      "assigned_duration": value.assigned_duration,
      "session": this.session

    }).subscribe((editedbook)=>{
      console.log(editedbook.json());
      this.getAllBooks();

    })
    }

    else{
      this.http.post((this.url+ '/book/book_edit'),{
      "_id": this.id,
      "title": value.title,
      "isbn": value.isbn,
      "assigned": value.assigned,
      "session": this.session

    }).subscribe((editedbook)=>{
      console.log(editedbook.json());
      this.getAllBooks();

    })
    }
    
  }



  addBook(){
  	  this.editMode = false;     
  	  this.title = '';
      this.isbn = '';
      this.assigned = false;
      this.assigned_duration = '';
      this.assigned_from = '';
      this.assigned_to = '';
      this.initializeForm();
      console.log(this.bookForm);
      this.openMyModal('effect-13');

    

  }

  checkStudent(value){
    console.log(value);
    let date = new Date();
    let session = date.getFullYear();
    if(value){
    this.http.post((this.url + '/student/student_get_for_erp_id'),{erp_id:value,session:this.session})
        .subscribe((student)=>{
            console.log(student.json());
            console.log(typeof(student.json()));
          if(typeof(student.json()) === "string"){
            this.invalidStudent = true;           
          }
          else{
            this.assigned_id = student.json();
            console.log("assigned_id:",this.assigned_id);
            this.invalidStudent = false; 
          }
        })
    }
  }

  editBook(index){
     this.editMode = true;
     this.id = (this.allBook[index])['_id'];
  	 this.title = (this.allBook[index])['title'];
     this.isbn = (this.allBook[index])['isbn'];
     this.assigned = (this.allBook[index])['assigned'];
     this.assigned_from = (this.allBook[index])['assigned_from'];

     if(this.allBook[index]['assigned_to']){this.assigned_to = (this.allBook[index])['assigned_to']['erp_id'];}
     this.assigned_duration = (this.allBook[index])['assigned_duration'];
  	 

        this.initializeForm();
        console.log(this.bookForm);
        this.openMyModal('effect-13');
  }
}
