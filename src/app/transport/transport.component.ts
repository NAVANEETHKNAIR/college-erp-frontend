import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public transportList:any;
public transportForm: FormGroup;
public name:any = '';
public vehicle_num:any = '';
public fare:number = 0;
public session:any = '';
public url:any = 'http://localhost:3000';
public allTransport:any;
public editMode:boolean;
public id:any;
public cookie:any;
  //import { SystemService } from '../system/service.system';
  constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    this.initializeForm();
    
  });
   this.initializeForm();
  }

ngOnInit() {
     this.getallTransport();
  }
  
getallTransport(){
 this.http.post((this.url+'/transport/transport_get_all'),{ "access_token": this.cookie,"session":this.session})
 .subscribe((transport)=>{
   console.log(transport.json());
   this.allTransport = transport.json();
   this.transportList = _.pluck(this.allTransport,'name');
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
   this.transportForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
      "vehicle_num": new FormControl(this.vehicle_num,Validators.required),
      "fare": new FormControl(this.fare,Validators.required),
  		"session": new FormControl(this.session,Validators.required)
   });
  }
  
  putTransport(value){
  	 console.log(value);
 
  	// let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post((this.url+'/transport/transport'),{
    	"name": value.name,
      "vehicle_num": value.vehicle_num,
      "fare": +value.fare,
      "session": this.session,
      "access_token": this.cookie


    }).subscribe((transport:any)=>{
        this.getallTransport();
           // this.getStaffMethod(value.type);
              	   
        });    
  }

  putEditedTransport(value){
    console.log(value);

    this.http.post((this.url+ '/transport/transport_edit'),{
      "_id": this.id,
      "name": value.name,
      "vehicle_num": value.vehicle_num,
      "fare": +value.fare,
      "session": this.session,
      "access_token": this.cookie

    }).subscribe((editedtransport)=>{
      console.log(editedtransport.json());
      this.getallTransport();

    })
  }



  addTransport(){
  	  this.editMode = false;     
  	  this.name = '';
      this.id = '';
      this.fare = 0;
      this.vehicle_num = '';
      this.initializeForm();
      console.log(this.transportForm);
      this.openMyModal('effect-13');

    

  }

  editTransport(index){
     this.editMode = true;
     this.id = (this.allTransport[index])._id;
  	 this.name = (this.allTransport[index]).name;
     this.vehicle_num = (this.allTransport[index]).vehicle_num;
     this.fare = +(this.allTransport[index]).fare;
        this.initializeForm();
        console.log(this.transportForm);
        this.openMyModal('effect-13');
  }
}
