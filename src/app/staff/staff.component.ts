import { Component, OnInit,ViewChild} from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
@ViewChild("fileInput") fileInput;
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public staffList:any;
public selectStaff:any;
public staffForm:FormGroup;
public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER'];
public name:any = '';
public gender:any = '';
public address:any = '';
public phone:any = '';
public birthday:any = '';
public email :any = '';
public type:any = '';
public dormitory:any = '';
public transport:any = '';
public date_of_join:any = '';
public aadhar_num:any = '';
public account_name:any = '';
public account_number:any = '';
public ifsc:any = '';
public caste :any = '';
public session:any = '';
public url:any = 'http://localhost:3000';
public urladd:any;
public editMode:boolean;
public cookie:any;
public img:any = [];
public image:any = null;
public currentSession:any;
public status:boolean;
 
  constructor(public http: Http,public fetchsession:SystemService, private cookieService: CookieService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.currentSession = session.session;
    this.session = this.fetchsession.getReportSession();
    console.log("session from session service",this.session);
    this.initializeForm();
    
  });
   this.initializeForm();
  }

  ngOnInit() {

  }

  getStaffMethod(value){
    console.log("getStaffMethod value:",value);
    this.img = [];
    this.type = value.toUpperCase();
    this.initializeForm();
    console.log("type:",this.type)
    this.http.post((this.url + '/' + value + '/' + value + '_get_all'),{ access_token: this.cookie,session: this.session})
    .subscribe((staff)=>{
      console.log(staff.json());

      this.staffList = staff.json();
      let stlen = this.staffList.length; 
     this.rowsOnPage = this.staffList.length;
        for(let i=0;i<stlen;i++){
          console.log(Boolean(this.staffList[i]['image']));

          if(this.staffList[i]['image']){
            //this.sanitizer.bypassSecurityTrustUrl(this.staffList[i]['image']['path']);
            this.img[i] = (this.url +'/uploads/' +this.staffList[i]['image']['filename']);
             
          }

        } 
      //this.rowsOnPage = this.staffList.length();
    })
    
    
   
  }


  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  initializeForm(){
   this.staffForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
  		"phone": new FormControl(this.phone,[Validators.required,Validators.maxLength(10)]),
  		"gender": new FormControl(this.gender,Validators.required),
  		"address": new FormControl(this.address,Validators.required),
  		"birthday": new FormControl(this.birthday,Validators.required),
  		"email": new FormControl(this.email,Validators.required),
      "type" : new FormControl(this.type,Validators.required), 		
  		"dormitory": new FormControl(this.dormitory),
  		"transport":new FormControl(this.transport),
  		"date_of_join": new FormControl(this.date_of_join,Validators.required),
  		"aadhar_num": new FormControl(this.aadhar_num),
  		"account_name": new FormControl(this.account_name),
  		"account_number": new FormControl(this.account_number),
  		"ifsc": new FormControl(this.ifsc),
  		"caste": new FormControl(this.caste,Validators.required),
  		"session": new FormControl(this.session,Validators.required),
      "status": new FormControl(this.status,Validators.required),
      "image": new FormControl(this.image)
   });
  }


    promoteStaff(value){
     console.log(value);


     console.log("value:",value.type)

    // let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post((this.url + '/' + value.type.toLowerCase() + '/' + value.type.toLowerCase()),{
      "username":value.email,
      "password":"12345",
      "name":value.name,
      "phone": value.phone,
      "gender": value.gender,
      "address": value.address,
      "birthday": value.birthday,
      "email": value.email,
      "type": value.type,
      "dormitory": value.dormitory || undefined,
      "transport": value.transport || undefined,
      "date_of_join": value.date_of_join,
      "aadhar_num":value.aadhar_num,
      "account_name": value.account_name,
      "account_number":value.account_number,
      "ifsc":value.ifsc,
      "caste": value.caste,
      "session": this.currentSession,
      "status": value.status,
      "access_token": this.cookie,
      "image": this.image


    }).subscribe((staff:any)=>{
          console.log("staff:",staff);
           this.selectStaff = value.type.toUpperCase();
           if(typeof staff.json()!=='string'){
          if(this.editMode){
             this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               console.log("msg91:",msg91);
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_edit_staff',{
                   msg91: msg91._id,
                    access_token: this.cookie,
                    user: staff.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody:  value.type + 'Updated',
                      to:  this.staffForm.value.staff_contact,
                      date : this.staffForm.value.date_of_joining,
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
      else{
          this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_new_staff',{
                   msg91: msg91._id,
                    access_token: this.cookie,
                    user: staff.json()

                 }).subscribe((messageRecieved:any)=>{
                     console.log(messageRecieved.json());
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody: value.type + 'Created',
                      to:  this.staffForm.value.staff_contact,
                      date : this.staffForm.value.date_of_joining,
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
           this.getStaffMethod(value.type);
                   
        });    
  }

  
  putStaff(value){
  	 console.log(value);


     console.log("value:",value.type)

  	// let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post((this.url + '/' + value.type.toLowerCase() + '/' + value.type.toLowerCase()),{
    	"username":value.email,
    	"password":"12345",
    	"name":value.name,
    	"phone": value.phone,
    	"gender": value.gender,
    	"address": value.address,
      "birthday": value.birthday,
      "email": value.email,
      "type": value.type,
      "dormitory": value.dormitory || undefined,
      "transport": value.transport || undefined,
      "date_of_join": value.date_of_join,
      "aadhar_num":value.aadhar_num,
      "account_name": value.account_name,
      "account_number":value.account_number,
      "ifsc":value.ifsc,
      "caste": value.caste,
      "status": value.status,
      "session": this.session,
      "access_token": this.cookie,
      "image": this.image


    }).subscribe((staff:any)=>{
           this.selectStaff = value.type.toUpperCase();
           console.log("typeof staff.json()!=='string",typeof staff.json()!=='string');

       if(typeof staff.json()!=='string'){
         console.log("Hitting");
          if(this.editMode){
            console.log("Hitted");
             this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               console.log("msg91:",msg91);
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_edit_staff',{
                   msg91: msg91._id,
                    access_token: this.cookie,
                    user: staff.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().acco){
                    this.http.post(this.url + '/message/message',{
                      messagebody:  value.type + 'Updated',
                      to:  this.staffForm.value.staff_contact,
                      date : this.staffForm.value.date_of_joining,
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
      else{
          this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_new_staff',{
                   msg91: msg91._id,
                    access_token: this.cookie,
                    user: staff.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody: value.type + 'Created',
                      to:  this.staffForm.value.staff_contact,
                      date : this.staffForm.value.date_of_joining,
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
  
           this.getStaffMethod(value.type);
              	   
        });    
  }

  addStaff(){
  	  this.editMode = false;     
  	  this.name = '';
  		this.gender =  '';
  		this.address = '';
      this.phone = '';
  		this.birthday ='';
  		this.email = '';
      this.type = '';
  		this.dormitory = '';
  		this.transport ='';
  		this.date_of_join ='';
  		this.aadhar_num ='';
  		this.account_name = '';
  		this.account_number = '';
  		this.ifsc ='';
      this.status = true;
  		this.caste ='';
      this.image = null;
  		// console.log("section before editing",this.section);
        this.initializeForm();
        console.log(this.staffForm);

        this.openMyModal('effect-13');

    

  }

  editStaff(staff){

     this.editMode = true;
  	  this.name = (this.staffList[staff]).name;
  		this.gender =  (this.staffList[staff]).gender;
  		this.address = (this.staffList[staff]).address;
      this.phone = (this.staffList[staff]).phone;
  		this.birthday = (this.staffList[staff]).birthday;
  		this.email = (this.staffList[staff]).email;
  		this.dormitory = (this.staffList[staff]).dormitory;
  		this.transport = (this.staffList[staff]).transport;
  		this.date_of_join = (this.staffList[staff]).date_of_join;
  		this.aadhar_num = (this.staffList[staff]).aadhar_num;
  		this.account_name = (this.staffList[staff]).account_name;
  		this.account_number = (this.staffList[staff]).account_number;
  		this.ifsc = (this.staffList[staff]).ifsc;
      this.status =  (this.staffList[staff]).status;
  		this.caste = (this.staffList[staff]).caste;
      this.image = (this.staffList[staff]).image? (this.staffList[staff]).image._id:null;


  		// console.log("section before editing",this.section);
  		// this.getClassMethodForm(this.class);
        this.initializeForm();
        console.log(this.staffForm);
        this.openMyModal('effect-13');
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


