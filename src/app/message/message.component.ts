import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CookieService } from 'ng2-cookies';
import { SystemService } from '../system/service.system';

//private cookieService: CookieService
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  //encapsulation: ViewEncapsulation.None
  // styles: [`
  //   quill-editor {
  //     display: block;
  //   }
  //   .ng-invalid {
  //     border: 1px dashed red;
  //   }
  //   /* Set default font-family */
  //   [quill-editor-element] {
  //     font-family: "Roboto";
  //   }
  //   /* Set dropdown font-families */
  //   [quill-editor-toolbar] .ql-font span[data-label="Aref Ruqaa"]::before {
  //     font-family: "Aref Ruqaa";
  //   }
  //   [quill-editor-toolbar] .ql-font span[data-label="Mirza"]::before {
  //     font-family: "Mirza";
  //   }
  //   [quill-editor-toolbar] .ql-font span[data-label="Roboto"]::before {
  //     font-family: "Roboto";
  //   }
  //   /* Set content font-families */
  //   .ql-font-mirza {
  //     font-family: "Mirza";
  //   }
  //   .ql-font-aref {
  //     font-family: "Aref Ruqaa";
  //   }
  //   /* We do not set Aref Ruqaa since it is the default font */
  // `],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {
 
 

 public messageForm:FormGroup;
 public items:any = [];
 public body:any;
 public date:string;
 public time:string;
 public url:any = 'http://localhost:3000';
 public getClassAll:any;
 public filterClass:any;
 public selectClass:boolean = false;
 public getSectionOfClass:any;
 public getClass:any = '';
 public getSection:any = '';
 public class_ref:any;
 public recipientList:any;
 public recipientType:any = '';
 public checkStatus:any = [];
 public rowsOnPage:any;
 public sortBy = '';
public sortOrder = 'desc';
public data: any;
public filterQuery = '';
public cookie:any;
public session:any;
public peopleList:any[] = [];

 constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    this.initializeForm();
    
  });
   this.initializeForm();
  }

 ngOnInit(){
   
 }
 
 initializeForm(){
 	this.messageForm = new FormGroup({
 		"body": new FormControl(this.body,Validators.required),
 		"to": new FormArray([]),
 		"date": new FormControl(this.date,Validators.required),
 		"time": new FormControl(this.time,Validators.required)
 	})
 }
  
  method(){
  	//items:[{display: "9876454432", value: "9876454432"}]
  	console.log(this.items);
  }

  removeTag(contact){
    console.log(contact);
    let pos = this.items.map(function(item){
      return item.value
        }).indexOf(contact.value);
      if(pos>-1){
       this.items.splice(pos,1);
      }
  }


  putMessage(value){
  	//this.date =

  	let date:any;
  	 date = (new Date()).toLocaleString();
  	date = date.split(",");
   let dateArr = date[0].split('/');
   (+dateArr[0] < 9)? (dateArr[0]= '0' + dateArr[0]):(dateArr[0]=dateArr[0])
    (+dateArr[1] < 9)? (dateArr[1]= '0' + dateArr[1]):(dateArr[1]=dateArr[1])
   this.date = (dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1]);
  	this.time = date[1];
    this.initializeForm();
  	for(let item of this.items){
  		(<FormArray>this.messageForm.controls['to']).push(new FormControl(item.value))
  	}
    
    console.log(this.messageForm.value);

    this.http.post(this.url + '/message/message',{
    	messagebody: this.messageForm.value.body,
    	to:  this.messageForm.value.to,
    	date : this.messageForm.value.date,
    	time: this.messageForm.value.time,
      session: this.session,
      access_token: this.cookie

    }).subscribe((message)=>{
    	console.log("Message sent successfully:",message);
    })
    

  	
  	console.log(value);
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  onContentChanged(value){
    console.log(value);
    this.body = value.text.replace('\n',"");
  }

  select(){
   this.recipientList = [];
   this.recipientType = "";
   this.checkStatus = [];
   this.openMyModal('effect-13');
  }

  editor(value){
    console.log(value); 
  }

  addTag(value){
     console.log("addTag:",value);
     this.items.push(value);
  }

  getRecipientMethod(value){
  	this.recipientType = value;
  	this.getClass = '';
  	this.getSection = '';
  	this.recipientList = [];
    this.checkStatus = [];
      if(value=== 'student'){
      	 this.http.post(this.url + '/newClass/get_class_all',{ "access_token": this.cookie,"session": this.session})
        .subscribe((data) => {
        console.log(data.json());
        this.getClassAll = data.json();

        let classArray:any
        this.filterClass= _.uniq(_.pluck(this.getClassAll,'name')); 
        	

        console.log("filterCLass:",this.filterClass);
      });
      }

      else{
      	this.http.post(this.url + '/' + value + '/' + value + '_get_all',{ "access_token": this.cookie, "session": this.session})
      	 .subscribe((staff)=>{
      	 	 console.log(staff.json())
             this.recipientList = staff.json();
             this.checkStatus = [];
             for(let i=0;i<this.recipientList.length;i++){
             	console.log((_.where(this.items,{display:this.recipientList[i]['phone'],value:this.recipientList[i]['phone']})).length>0)
               if((_.where(this.items,{display:this.recipientList[i]['phone'],value:this.recipientList[i]['phone']})).length>0){
                this.checkStatus[i] = true;
               }
               else{

               	 this.checkStatus[i] = false;
               }	
             }

             
             this.rowsOnPage = this.recipientList.length;
      	 })
      }
  }

  getClassMethod(value){
  	this.recipientList = [];
    console.log(value);
    this.getClass = value;
    this.getSection = '';
    this.selectClass = true;
    this.getSectionOfClass = _.where(this.getClassAll,{name:this.getClass});
    console.log("getSectionOfClass:",this.getSectionOfClass);
  }

  getSectionMethod(value){
     this.getSection = value;
     this.class_ref= _.where(this.getClassAll,{name:this.getClass,section:this.getSection})[0]['_id'];
     this.http.post(this.url + '/student/students_get_for_class_ref',{class_ref:this.class_ref, access_token: this.cookie, session: this.session})
        .subscribe((data)=>{
        	console.log(data.json());
        	this.checkStatus = [];
        	this.recipientList = data.json();
            for(let i=0;i<this.recipientList.length;i++){
            	if((_.where(this.items,{display:this.recipientList[i]['parent_contact'],value:this.recipientList[i]['parent_contact']})).length>0){
            		this.checkStatus[i] = true;
            	}
            	else{
            		this.checkStatus[i] = false;
            	}
            }
            this.rowsOnPage = this.recipientList.length;
        })
  }

  selectRecipientMethod(){
     console.log(this.checkStatus)
     if(this.checkStatus.length > 0){
       for(let i=0;i<this.checkStatus.length;i++){
     	if(this.checkStatus[i]=== true){
     		if(this.recipientType === 'student'){
         
             if((_.where(this.items,{display:this.recipientList[i]['parent_contact'],value:this.recipientList[i]['parent_contact']})).length==0){

             	this.items.push({display:this.recipientList[i]['parent_contact'],value:this.recipientList[i]['parent_contact']})
              
             }

            // (<FormArray>this.messageForm.controls['to']).push(new FormControl(this.recipientList[i]['parent_contact']));
             
     	     }
	     	else{
	     		 if((_.where(this.items,{display:this.recipientList[i]['phone'],value:this.recipientList[i]['phone']})).length==0){
	     	   // (<FormArray>this.messageForm.controls['to']).push(new FormControl(this.recipientList[i]['phone']));
	     	   this.items.push({display:this.recipientList[i]['phone'],value:this.recipientList[i]['phone']})
	     	   console.log(this.items);
	     	}
	     }
        }

   
    }	
     }
     
  }

  setFocus(value){
    console.log(value);
  }

  checkCheckbox(value,contact){

    //this.peopleList.push(...this.recipientList);
    console.log('contact',contact);
    //console.log("peoples are:",this.peopleList);
    console.log(this.recipientList)

  	if(value == false){
  		let pos = this.items.map(function(item){
    	return item.value
        }).indexOf(contact)
      if(pos>-1){
       this.items.splice(pos,1);
      }
  	}
   
      

    
  }


}
