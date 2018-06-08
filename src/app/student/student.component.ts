import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';

//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public getClassAll:any;
public selectClass:any;
public selectSection:any;
public studentList:any;
public result: any;
public filterClass:any;
public getSectionOfClass:any;
public studentForm:FormGroup;
public getSectionOfClassForm:any;
public getClassValue:any;
public name:any = '';
public student_contact:any = '';
public parent_contact:any = '';
public gender:any = '';
public address:any = '';
public birthday:any = '';
public email :any = '';
public class:any = '';
public section: any = '';
public dormitory:any = '';
public transport:any = '';
public date_of_join:any = '';
public aadhar_num:any = '';
public account_name:any = '';
public account_number:any = '';
public ifsc:any = '';
public caste :any = '';
public editMode:boolean;
public session:any = '';
public url:any = 'http://localhost:3000';
public cookie:any;
public dormitory_id:any = "";
public vehicle_id: any = "";
public correctDorm:boolean = true;
public correctVehicle:boolean = true;
  //import { SystemService } from '../system/service.system';
 constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    console.log(this.cookieService.getAll()['cookieSet']);

    this.initializeForm();
    
  });
   this.initializeForm();
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

  getSectionMethod(value){
  	console.log(value);
 	this.selectSection = value;
  	console.log(this.selectClass);
  	console.log('select section:',this.selectSection);
    this.result = _.where(this.getClassAll,{name: this.selectClass, section: value})[0];
    console.log(this.result._id);
    this.http.post(this.url + '/student/students_get_for_class_ref',{class_ref:this.result._id,access_token: this.cookie,session:this.session})
        .subscribe((data)=>{
        	console.log(data.json());
        	this.studentList = data.json();
            this.rowsOnPage = this.studentList.length;
        })
  }

  getClassMethod(value){
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

  initializeForm(){
   this.studentForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
  		"student_contact": new FormControl(this.student_contact,Validators.required),
  		"parent_contact": new FormControl(this.parent_contact,Validators.required),
  		"gender": new FormControl(this.gender,Validators.required),
  		"address": new FormControl(this.address,Validators.required),
  		"birthday": new FormControl(this.birthday,Validators.required),
  		"email": new FormControl(this.email,Validators.required),
  		"class": new FormControl(this.class,Validators.required),
  		"section": new FormControl(this.section,Validators.required),
  		"dormitory": new FormControl(this.dormitory),
  		"transport":new FormControl(this.transport),
  		"date_of_join": new FormControl(this.date_of_join,Validators.required),
  		"aadhar_num": new FormControl(this.aadhar_num),
  		"account_name": new FormControl(this.account_name),
  		"account_number": new FormControl(this.account_number),
  		"ifsc": new FormControl(this.ifsc),
  		"caste": new FormControl(this.caste,Validators.required),
  		"session": new FormControl(this.session,Validators.required),


   });
  }
  
  putStudent(value){
  	 console.log(value);

  	let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post( this.url+ '/student/student',{
    	"username":value.email,
    	"password":"12345",
    	"name":value.name,
    	"student_contact": value.student_contact,
    	"parent_contact": value.parent_contact,
    	"gender": value.gender,
    	"address": value.address,
      "birthday": value.birthday,
      "email": value.email,
      "class_ref": class_ref._id,
      "dormitory": this.dormitory_id || undefined,
      "transport": this.vehicle_id || undefined,
      "date_of_join": value.date_of_join,
      "aadhar_num":value.aadhar_num,
      "account_name": value.account_name,
      "account_number":value.account_number,
      "ifsc":value.ifsc,
      "caste": value.caste,
      "session": this.session,
      "access_token": this.cookie


    }).subscribe((student:any)=>{
    	console.log(student);
    	this.http.post(this.url + '/student/students_get_for_class_ref',{class_ref:(student.json()).class_ref,session:this.session, access_token: this.cookie})
        .subscribe((data)=>{
        	console.log(data.json());
        	this.studentList = data.json();
            this.rowsOnPage = this.studentList.length;
        })

    
    })
                     


  }

  addStudent(){
	    this.editMode = false; 
	    this.name = '';
  		this.student_contact= '';
  		this.parent_contact = '';
  		this.gender =  '';
  		this.address = '';
  		this.birthday ='';
  		this.email = '';
  		this.class =  '';
  		this.section = '';
  		this.dormitory = '';
  		this.transport ='';
  		this.date_of_join ='';
  		this.aadhar_num ='';
  		this.account_name = '';
  		this.account_number = '';
  		this.ifsc ='';
  		this.caste ='';
  		
  		console.log("section before editing",this.section);
        this.initializeForm();
        console.log(this.studentForm);
        this.openMyModal('effect-13');

    

  }

  editStudent(student){
  	  this.editMode = true;
      this.name = (this.studentList[student]).name;    
  		this.student_contact=  (this.studentList[student]).student_contact;
  		this.parent_contact =  (this.studentList[student]).parent_contact;
  		this.gender =  (this.studentList[student]).gender;
  		this.address = (this.studentList[student]).address;
  		this.birthday = (this.studentList[student]).birthday;
  		this.email = (this.studentList[student]).email;
  		this.class =  this.selectClass;
  		this.section = this.selectSection;
  		this.dormitory = (this.studentList[student]).dormitory ? (this.studentList[student]).dormitory.room_num : "";
  		this.transport = (this.studentList[student]).transport ?  (this.studentList[student]).transport.vehicle_num: "";
  		this.date_of_join = (this.studentList[student]).date_of_join;
  		this.aadhar_num = (this.studentList[student]).aadhar_num;
  		this.account_name = (this.studentList[student]).account_name;
  		this.account_number = (this.studentList[student]).account_number;
  		this.ifsc = (this.studentList[student]).ifsc;
  		this.caste = (this.studentList[student]).caste;

  		console.log("section before editing",this.section);
  		this.getClassMethodForm(this.class);
        this.initializeForm();
        console.log(this.studentForm);
        this.openMyModal('effect-13');
  }

  addDorm(dorm){
    if(dorm){
      this.http.post(this.url + '/dormitory/dormitory_get_room',{room_num:dorm, access_token: this.cookie})
           .subscribe((dormitory:any)=>{
             dormitory = dormitory.json();
             console.log(dormitory);
             console.log(typeof dormitory!== 'string');
             if(typeof dormitory!== 'string'){
               this.dormitory_id = dormitory._id;

               this.correctDorm = true;
             }

             else{
               this.correctDorm = false;
             }

           })
    }
  }

    addVehicle(vehicle){
    if(vehicle){
      this.http.post(this.url + '/transport/transport_get_vehicle',{vehicle_num:vehicle, access_token: this.cookie})
           .subscribe((transport:any)=>{
            
             transport = transport.json();
              console.log(transport);
              console.log(typeof transport!== 'string')
             if(typeof transport!== 'string'){
               this.vehicle_id = transport._id;
               console.log(this.vehicle_id);
               this.correctVehicle = true;
             }

              else{
               this.correctVehicle = false;
             }

           })
    }
  }

}

