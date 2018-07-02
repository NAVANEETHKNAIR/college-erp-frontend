import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
import { SwalService } from '../swal/swal.service';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
// public staffList:any;
// public selectStaff:any;
public classForm:FormGroup;
public section:any;
// public sectionForm: FormGroup;
// public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER STAFF'];
public name:any = '';
public erp_id:any = '';
public className:any;
public filterClass:any;
public session:any = '';
public url:any = 'http://localhost:3000';
public urladd:any;
public editMode:boolean;
public classList:any;
public getSectionOfClass;
public classDetail:any;
public id:any;
public sectionList:any;
public cookie:any;

//import { SystemService } from '../system/service.system';
  constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService, private swal: SwalService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    this.initializeForm();

    
  });
  
  this.initializeForm();

}

  ngOnInit() {
     this.getAllClass();

  }

 
  getAllClass(){
    this.http.post((this.url+'/newClass/get_class_all'),{access_token: this.cookie})
     .subscribe((newClass)=>{
       this.classList = newClass.json();
       console.log("classList",this.classList);
       this.filterClass = _.uniq(_.pluck(this.classList,'name'));
       
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
   this.classForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
      "section": new FormControl(this.section,Validators.required),
  		"session": new FormControl(this.session,Validators.required)
   });
  }
  

  getClassMethod(value){
     this.name = value;
     this.getSectionOfClass = (_.where(this.classList,{name:value}));
     this.sectionList = _.pluck(this.getSectionOfClass,'section');
     console.log("sections:",this.getSectionOfClass);

  }



  putClass(value,event){
  	 console.log(value);
    this.http.post((this.url+'/newClass/class_create'),{
  
    	"name": value.name,
    	"section": value.section,
      "session": this.session,
      "access_token": this.cookie


    }).subscribe((classname:any)=>{          	   
          console.log(classname.json());
           this.id = (classname.json())._id;
          this.http.post((this.url+'/newClass/get_class_all'),{access_token:this.cookie})
             .subscribe((newClass)=>{
               this.classList = newClass.json();
               console.log("classList",this.classList);
               this.filterClass = _.uniq(_.pluck(this.classList,'name'));
               this.name = _.pluck((_.where(this.classList,{_id:this.id})),'name')[0];
               console.log("name inside putClassEdited",this.name);
               this.getClassMethod(this.name);
                event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('md-show');
               this.swal.openSuccessSwal();


               //this.initializeForm();
             });

        });    
  }

  addClass(){
  	  this.editMode = false;     
  	  this.name = '';
      this.id = '';
      this.section = '';
      this.sectionList = [];
        this.initializeForm();
        console.log(this.classForm);

        this.openMyModal('effect-13');

    

  }
  
  putClassEdited(editedClass,event){
        console.log("editedClass",editedClass);
        this.http.post((this.url + '/newClass/class_edit'),{
            "_id": this.id,
            "name": editedClass.name,
            "section": editedClass.section,
            "session": this.session,
            "access_token": this.cookie
        }).subscribe((neweditedclass)=>{
            console.log("neweditedClassfromserver",neweditedclass.json());
                
                this.http.post((this.url+'/newClass/get_class_all'),{access_token: this.cookie})
                   .subscribe((newClass)=>{
                     this.classList = newClass.json();
                     console.log("classList",this.classList);
                     this.filterClass = _.uniq(_.pluck(this.classList,'name'));
                     this.name = _.pluck((_.where(this.classList,{_id:this.id})),'name')[0];
                     console.log("name inside putClassEdited",this.name);
                     this.getClassMethod(this.name);
                     //this.initializeForm();
                      event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('md-show');
                      this.swal.openSuccessSwal();
                   });
               
                
             
               

        })

  }

  editClass(index){
     this.editMode = true;
     console.log("classListinEditMode",this.getSectionOfClass[index]);
     this.id = (this.getSectionOfClass[index])._id;
     this.name = (this.getSectionOfClass[index]).name;
     this.section = (this.getSectionOfClass[index]).section;
     this.session = this.session;
      //this.id = _.pluck(_.where(this.classList,{name:this.name}),'_id')[0];
      console.log(this.id);
      //this.section = (this.classList[index]).section;
  		//this.session = (this.classList[index]).session;
        this.initializeForm();
        console.log(this.classForm);
        this.openMyModal('effect-13');
  }
}
