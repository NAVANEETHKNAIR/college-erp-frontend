import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CookieService } from 'ng2-cookies';
import  { SystemService } from './service.system';
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
public systemForm:FormGroup;
public msg91Form:FormGroup;
public nodemailerForm:FormGroup;
public section:any;
public message_sid:any;
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
public _idmsg91:any;
public _idnodemailer:any;
public editModeNodemailer:boolean = false;
public editModeTwilio: boolean = false;
public cookie:any;
public changeSession:any;
public sessionListArray:any;
public selectedSession:any;
public auth_key:any;
  constructor(public http: Http,private cookieService: CookieService, public fetchsession:SystemService) {
  this.cookie = this.cookieService.getAll()['cookieSet'];
  this.getSessionArray();
  this.initializeForm();
  this.initializeFormMSG91();
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
        this.selectedSession = system.current_session;
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


  initializeFormMSG91(){
     this.msg91Form = new FormGroup({
       "auth_key" : new FormControl(this.auth_key,Validators.required),
     })
  }



  sessionReport(value){
    console.log(value);
    this.fetchsession.changeReportSession(value);
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

    putMSG91(value){
     console.log(value);
    this.http.post((this.url+'/msg91/msg91_create'),{
  
      "auth_key": value.auth_key,
      "access_token": this.cookie

    }).subscribe((system:any)=>{               
                console.log("data recieved",system);
                if(system.json()){
                  this.editMode = true;
                }
                
               //this.initializeForm();
             });

         
  }


  putMSG91Edited(value){
    this.fetchsession.getMSG91().subscribe((msg91)=>{
      this._idmsg91 = msg91['_id']
      this.http.post(this.url+ '/msg91/msg91_configure',{
         _id: this._idmsg91,
         access_token:this.cookie,
         auth_key: value.auth_token
      }).subscribe((savedMSG91)=>{
        console.log(savedMSG91.json());
      })
    })
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

  promoteSession(){
      this.changeSession = ((new Date()).getFullYear()).toString();
      console.log(this.changeSession);
      this.http.post(this.url + '/system/promote_session',{
        access_token: this.cookie,
        changeSession: this.changeSession
        // changeSession: "2019"
      }).subscribe((data:any)=>{
         console.log(data.json());
         data = data.json();
         this.getSessionArray();
         if(data.current_session){
                   this.current_session = data.current_session;
                   this.initializeForm();  
         }
   
    
      })
 }

  getSessionArray(){
  //this.changeSession
  this.http.post(this.url+ '/system/get_session_array',{
    "access_token":this.cookie
  }).subscribe((data:any)=>{
    data = data.json();
    this.sessionListArray = data.sessionArray;
  })
}


}
