import { Component, OnInit,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
//import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//import {FileUploader} from 'ng2-file-upload';

//import { ModalComponent } from '../components/advanced-component

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
@ViewChild("fileInput") fileInput;
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public getClassAll:any;
public selectClass:any;
public selectSection:any;
public adminList:any;
public result: any;
public filterClass:any;
public getSectionOfClass:any;
public adminForm:FormGroup;
public getSectionOfClassForm:any;
public getClassValue:any;
public name:any = '';
public admin_contact:any = '';
public alternate_contact:any = '';
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
public status:boolean;
  //import { SystemService } from '../system/service.system';
 constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];

   this.initializeForm();

   this.http.post(this.url+ '/admin/admin_get_all',{
     access_token: this.cookie
   }).subscribe((data)=>{
     if(data.json()){
       this.adminList = data.json();
     }
   })
  }

  ngOnInit() {

  }


  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


  initializeForm(){
   this.adminForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
  		"admin_contact": new FormControl(this.admin_contact,[Validators.required,Validators.maxLength(10)]),
  		"alternate_contact": new FormControl(this.alternate_contact),
  		"gender": new FormControl(this.gender,Validators.required),
  		"address": new FormControl(this.address,Validators.required),
  		"birthday": new FormControl(this.birthday,Validators.required),
  		"email": new FormControl(this.email,Validators.required),
  		"date_of_join": new FormControl(this.date_of_join,Validators.required),
  		"aadhar_num": new FormControl(this.aadhar_num),
  		"account_name": new FormControl(this.account_name),
  		"account_number": new FormControl(this.account_number),
  		"ifsc": new FormControl(this.ifsc),
  		"caste": new FormControl(this.caste,Validators.required),
      "image": new FormControl(this.image),
      "status" : new FormControl(this.status,Validators.required)


   });
  }
  
  putAdmin(value){
  	 console.log(value);

  	let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post( this.url+ '/admin/admin',{
    	"username":value.email,
    	"name":value.name,
    	"admin_contact": value.admin_contact,
    	"alternate_contact": value.alternate_contact,
    	"gender": value.gender,
    	"address": value.address,
      "birthday": value.birthday,
      "email": value.email,
      "date_of_join": value.date_of_join,
      "aadhar_num":value.aadhar_num,
      "account_name": value.account_name,
      "account_number":value.account_number,
      "ifsc":value.ifsc,
      "caste": value.caste,
      "image": this.image,
      "status": this.status,
      "access_token": this.cookie,
   


    }).subscribe((admin:any)=>{
    	console.log(admin);
    	this.http.post(this.url + '/admin/admin_get_all',{access_token: this.cookie})
        .subscribe((data)=>{
        	console.log(data.json());
        	this.adminList = data.json();
          let stlen = this.adminList.length; 
          this.rowsOnPage = this.adminList.length;
          for(let i=0;i<stlen;i++){
            console.log(Boolean(this.adminList[i]['image']));

            if(this.adminList[i]['image']){

              this.img[i] = (this.url +'/uploads/' +this.adminList[i]['image']['filename']);
               
            }

          } 
        console.log("img",this.img);
        if(admin.json()!=='string'){
          if(this.editMode){
             this.fetchsession.getMSG91().subscribe((msg91:any)=>{
               if(typeof msg91!== 'string'){
                 this.http.post(this.url + '/msg91/send_msg91_edit_staff',{
                   msg91: msg91._id,
                    access_token: this.cookie,
                    user: admin.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody: 'Admin Updated',
                      to:  this.adminForm.value.admin_contact,
                      date : this.adminForm.value.date_of_joining,
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
                    user: admin.json()

                 }).subscribe((messageRecieved:any)=>{
                     let date:any;
                     date = (new Date()).toLocaleString();
                    date = date.split(",");
                    let time = date[1];
                   if(messageRecieved.json().message){
                    this.http.post(this.url + '/message/message',{
                      messagebody: 'New Admin Created',
                      to:  this.adminForm.value.admin_contact,
                      date : this.adminForm.value.date_of_joining,
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

    
    })
                     


  }


  addAdmin(){
	    this.editMode = false;
      this.status = true; 
	    this.name = '';
  		this.admin_contact= '';
  		this.alternate_contact = '';
  		this.gender =  '';
  		this.address = '';
  		this.birthday ='';
  		this.email = '';
  		this.date_of_join ='';
  		this.aadhar_num ='';
  		this.account_name = '';
  		this.account_number = '';
  		this.ifsc ='';
      this.image = null;
  		this.caste ='';
  		
  		console.log("section before editing",this.section);
        this.initializeForm();
        console.log(this.adminForm);
        this.openMyModal('effect-13');

    

  }
  
  setValidation(value){
    this.status = value;
  }

  editAdmin(admin){
  	  this.editMode = true;
      this.name = (this.adminList[admin]).name;    
  		this.admin_contact=  (this.adminList[admin]).admin_contact;
  		this.alternate_contact =  (this.adminList[admin]).alternate_contact;
  		this.gender =  (this.adminList[admin]).gender;
  		this.address = (this.adminList[admin]).address;
  		this.birthday = (this.adminList[admin]).birthday;
  		this.email = (this.adminList[admin]).email;
  		this.date_of_join = (this.adminList[admin]).date_of_join;
  		this.aadhar_num = (this.adminList[admin]).aadhar_num;
  		this.account_name = (this.adminList[admin]).account_name;
  		this.account_number = (this.adminList[admin]).account_number;
  		this.ifsc = (this.adminList[admin]).ifsc;
  		this.caste = (this.adminList[admin]).caste;
      this.status =  (this.adminList[admin]).status;
      this.image = (this.adminList[admin]).image? (this.adminList[admin]).image._id:null;

  		console.log("section before editing",this.section);
        this.initializeForm() ;
        console.log(this.adminForm);
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

