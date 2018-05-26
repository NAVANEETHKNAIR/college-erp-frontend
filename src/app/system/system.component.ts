import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService

//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
// public staffList:any;
// public selectStaff:any;
public systemForm:FormGroup;
public twilioForm:FormGroup;
public nodemailerForm:FormGroup;
public section:any;
// public sectionForm: FormGroup;
// public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER STAFF'];
public name:any = '';
public erp_id:any = '';
public systemName:any;
public filtersystem:any;
public session:any = '';
public url:any = 'http://localhost:3000';
public urladd:any;
public editMode:boolean;
public systemList:any;
public getSectionOfsystem;
public systemDetail:any;
public id:any;
public sectionList:any;
public email:any;
public sessions:any = [];
public phone:any;
public address:any;
public current_session:any;
public _id: any;
public account_sid:any;
public auth_token:any;
public contact: any;
public mail:any;
public client_id:any;
public client_secret:any;
public refresh_token:any;
public _idtwilio:any;
public _idnodemailer:any;
public editModeNodemailer:boolean = false;
public editModeTwilio: boolean = false;
public cookie:any;
  constructor(public http: Http,private cookieService: CookieService) {
  this.cookie = this.cookieService.getAll()['cookieSet'];
  this.initializeForm();
  this.initializeFormTwilio();
  this.initializeFormNodemailer();


}

ngOnInit(){
  this.http.post(this.url + '/system/system_get',{ "access_token": this.cookie}).subscribe((system:any)=>{
     if(system.json()){
        system = system.json();
        this._id = system._id;
        this.name = system.name;
        this.address = system.address;
        this.phone = system.phone;
        this.email = system.email;
        this.current_session = system.current_session;
        this.initializeForm();
     }
  })
}
 
// <!-- name,address,phone,email,currency,sessions,current_session, -->
 
 initializeForm(){
   this.systemForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
      "address": new FormControl(this.address,Validators.required),
      "phone" : new FormControl(this.phone, Validators.required),
      "email": new FormControl(this.email,[Validators.required,Validators.email]),
  		"current_session": new FormControl(this.current_session,[Validators.required,Validators.maxLength(4),Validators.minLength(4)])
   });
  }


  initializeFormTwilio(){
     this.twilioForm = new FormGroup({
       "account_sid" : new FormControl(this.account_sid,Validators.required),
       "auth_token" : new FormControl(this.auth_token, Validators.required),
       "contact": new FormControl(this.contact, Validators.required)
     })
  }
  

 initializeFormNodemailer(){
         this.nodemailerForm = new FormGroup({
       "mail" : new FormControl(this.account_sid,Validators.required),
       "client_id" : new FormControl(this.auth_token, Validators.required),
       "client_secret": new FormControl(this.contact, Validators.required),
       "refresh_token" : new FormControl(this.refresh_token, Validators.required)
     })
 }
 
  


  putSystem(value){
  	 console.log(value);
    this.http.post((this.url+'/system/system'),{
  
    	"name": value.name,
    	"address": value.address,
      "phone": value.phone,
      "email": value.email,
      "current_session": value.current_session,
      "access_token": this.cookie

    }).subscribe((system:any)=>{          	   
                console.log("data recieved",system);
                if(system.json()){
                  this.editMode = true;
                }
                
               //this.initializeForm();
             });

         
  }

  
  
  
  putSystemEdited(value){
      console.log("editedsystem",value);
      this.http.post((this.url + '/system/system'),{
          "_id": this._id,
          "name": value.name,
          "address": value.address,
          "phone": value.phone,
          "email": value.email,
          "current_session": value.current_session,
          "access_token": this.cookie
      }).subscribe((neweditedsystem)=>{
          console.log(neweditedsystem.json());
              
              
                   //this.initializeForm();
    });
               
  }

    putTwilio(value){
     console.log(value);
    this.http.post((this.url+'/twilio/configure_twilio'),{
  
      "account_sid": value.account_sid,
      "auth_token": value.auth_token,
      "contact": value.contact,
      "access_token": this.cookie
      

    }).subscribe((twilio:any)=>{               
                console.log("data recieved",twilio);
                if(twilio.json()){
                  this.editMode = true;
                }
                
               //this.initializeForm();
             });

         
  }

  
  
  
  putTwilioEdited(value){

      console.log("editedsystem",value);
      this.http.post((this.url + '/twilio/edit_twilio'),{
          "_id": this._idtwilio,
          "account_sid": value.account_sid,
          "auth_token": value.auth_token,
          "contact": value.contact,
          "access_token": this.cookie
      }).subscribe((neweditedsystem)=>{
          console.log(neweditedsystem.json());
              
              
                   //this.initializeForm();
    });
               
  }


  putNodemailer(value){
     console.log(value);
    this.http.post((this.url+'/nodemailer/configure_nodemailer'),{
  
      "mail": value.mail,
      "client_id": value.client_id,
      "client_secret": value.client_secret,
      "refresh_token": value.refresh_token,
      "access_token": this.cookie
      

    }).subscribe((twilio:any)=>{               
                console.log("data recieved",twilio);
                if(twilio.json()){
                  this.editMode = true;
                }
                
               //this.initializeForm();
             });

         
  }

  
  
  
  putNodemailerEdited(value){
      console.log("editedsystem",value);
      this.http.post((this.url + '/nodemailer/edit_nodemailer'),{
          "_id": this._idnodemailer,
           "mail": value.mail,
          "client_id": value.client_id,
          "client_secret": value.client_secret,
          "refresh_token": value.refresh_token,
          "access_token": this.cookie
      }).subscribe((neweditedsystem)=>{
          console.log(neweditedsystem.json());

    });
}

}
