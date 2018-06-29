import { Component, OnInit,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//import {FileUploader} from 'ng2-file-upload';

//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
@ViewChild("fileInput") fileInput;
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
//public uploader:FileUploader;
public image:any = null;
public img:any[] = [];
public currentSession:any;
public guardian:any;
public status:any;
  //import { SystemService } from '../system/service.system';
 constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService,private sanitizer: DomSanitizer) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.currentSession = session.session;
    this.session = this.fetchsession.getReportSession();
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
          let stlen = this.studentList.length; 
          this.rowsOnPage = this.studentList.length;
          for(let i=0;i<stlen;i++){
            console.log(Boolean(this.studentList[i]['image']));

            if(this.studentList[i]['image']){
              //this.sanitizer.bypassSecurityTrustUrl(this.studentList[i]['image']['path']);
              this.img[i] = (this.url +'/uploads/' +this.studentList[i]['image']['filename']);
               
            }

          } 
        console.log("img",this.img);  
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
      "guardian": new FormControl(this.name,Validators.required),
  		"student_contact": new FormControl(this.student_contact,Validators.maxLength(10)),
  		"parent_contact": new FormControl(this.parent_contact,[Validators.required,Validators.maxLength(10)]),
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
      "image": new FormControl(this.image), 
  		"session": new FormControl(this.session,Validators.required),
      "status": new FormControl(this.status,Validators.required)


   });
  }
  
  putStudent(value){
  	 console.log(value);

  	let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post( this.url+ '/student/student',{
    	"username":value.email,
      "guardian": value.guardian,
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
      "image": this.image,
      "access_token": this.cookie,
      "status": value.status
   


    }).subscribe((student:any)=>{
    	console.log(student);
            if(typeof student.json()!=='string'){
          if(this.editMode){
             this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               console.log('msg91:',msg91)
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_edit_student',{
                   msg91: msg91._id,
                    access_token: this.cookie,
                    user: student.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody: 'Student Updated',
                      to:  [this.studentForm.value.parent_contact,this.studentForm.value._contact],
                      date : this.studentForm.value.date_of_joining,
                      time: time,
                      session: this.session,
                      access_token: this.cookie

                    }).subscribe((message)=>{
                      console.log("Message sent successfully:",message);
                    })
                   }
                  else{
                    console.log("Message not sent successfully",messageRecieved.json());
                  }
                 })
               }
         })
            }
      else{
          this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_new_student',{
                   msg91: msg91._id,
                    access_token: this.cookie,
                    user: student.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody: 'Student Created',
                      to:  this.studentForm.value.student_contact,
                      date : this.studentForm.value.date_of_joining,
                      time: time,
                      session: this.session,
                      access_token: this.cookie

                    }).subscribe((message)=>{
                      console.log("Message sent successfully:",message);
                    })
                   }
                  else{
                    console.log("Message not sent successfuly",messageRecieved.json());
                  }
                 })
               }
         })
       } 
      }
    	this.http.post(this.url + '/student/students_get_for_class_ref',{class_ref:(student.json()).class_ref,session:this.session, access_token: this.cookie})
        .subscribe((data)=>{
        	console.log(data.json());
        	this.studentList = data.json();
          let stlen = this.studentList.length; 
          this.rowsOnPage = this.studentList.length;
          for(let i=0;i<stlen;i++){
            console.log(Boolean(this.studentList[i]['image']));

            if(this.studentList[i]['image']){
              //this.sanitizer.bypassSecurityTrustUrl(this.studentList[i]['image']['path']);
              this.img[i] = (this.url +'/uploads/' +this.studentList[i]['image']['filename']);
               
            }

          } 
        console.log("img",this.img);  
        })

    
    })
                     


  }

  promoteStudent(value){
     console.log(value);

    let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post( this.url+ '/student/student',{
      "username":value.email,
      "guardian":value.guardian, 
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
      "session": this.currentSession,
      "image": this.image,
      "access_token": this.cookie,
      "status": value.status
   


    }).subscribe((student:any)=>{
      console.log(student);
      if(typeof student.json()!=='string'){
          if(this.editMode){
             this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_edit_student',{
                   msg91: msg91._id,
                   access_token: this.cookie,
                    user: student.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody: 'Student Updated',
                      to:  [this.studentForm.value.parent_contact,this.studentForm.value._contact],
                      date : this.studentForm.value.date_of_joining,
                      time: time,
                      session: this.session,
                      access_token: this.cookie

                    }).subscribe((message)=>{
                      console.log("Message sent successfully:",message);
                    })
                   }
                  else{
                    console.log("Message not sent successfully",messageRecieved.json());
                  }
                 })
               }
         })
            }
      else{
          this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_new_student',{
                   msg91: msg91._id,
                    access_token: this.cookie,
                    user: student.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody: 'Student Created',
                      to:  this.studentForm.value.student_contact,
                      date : this.studentForm.value.date_of_joining,
                      time: time,
                      session: this.session,
                      access_token: this.cookie

                    }).subscribe((message)=>{
                      console.log("Message sent successfully:",message);
                    })
                   }
                  else{
                    console.log("Message not sent successfuly",messageRecieved.json());
                  }
                 })
               }
         })
       } 
      }
    
    })
                     


  }

  addStudent(){
	    this.editMode = false; 
	    this.name = '';
      this.guardian= '';
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
      this.image = null;
  		this.caste ='';
      this.status = true;
  		
  		console.log("section before editing",this.section);
        this.initializeForm();
        console.log(this.studentForm);
        this.openMyModal('effect-13');

    

  }


  editStudent(student){
  	  this.editMode = true;
      this.name = (this.studentList[student]).name;
      this.guardian =  (this.studentList[student]).guardian, 
  		this.student_contact=  (this.studentList[student]).student_contact;
  		this.parent_contact =  (this.studentList[student]).parent_contact;
  		this.gender =  (this.studentList[student]).gender;
  		this.address = (this.studentList[student]).address;
  		this.birthday = (this.studentList[student]).birthday;
  		this.email = (this.studentList[student]).email;
  		this.class =  (this.studentList[student]).class_ref.name;
  		this.section = (this.studentList[student]).class_ref.section;
  		this.dormitory = (this.studentList[student]).dormitory ? (this.studentList[student]).dormitory.room_num : "";
  		this.transport = (this.studentList[student]).transport ?  (this.studentList[student]).transport.vehicle_num: "";
  		this.date_of_join = (this.studentList[student]).date_of_join;
  		this.aadhar_num = (this.studentList[student]).aadhar_num;
  		this.account_name = (this.studentList[student]).account_name;
  		this.account_number = (this.studentList[student]).account_number;
  		this.ifsc = (this.studentList[student]).ifsc;
  		this.caste = (this.studentList[student]).caste;
      this.image = (this.studentList[student]).image? (this.studentList[student]).image._id:null;
      this.status = (this.studentList[student]).status;

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




addFile() {
let fi = this.fileInput.nativeElement;
if (fi.files && fi.files[0]) {
    let fileToUpload = fi.files[0];
    this.fetchsession
        .upload(fileToUpload)
        .subscribe(res => {
            console.log(res.json());
            let val = res.json();
            if(typeof val !== 'string')
            this.image = val['_id'];
           
        });
    
    }
  }

editFile(){
  let fi = this.fileInput.nativeElement;
  if (fi.files && fi.files[0]) {
    let fileToUpload = fi.files[0];
    this.fetchsession
        .editupload(fileToUpload,this.image)
        .subscribe(res => {
            console.log(res.json());
            let val = res.json();
            if(typeof val !== 'string')
            this.image = val['_id'];
         
        });
    
    }
}

}

