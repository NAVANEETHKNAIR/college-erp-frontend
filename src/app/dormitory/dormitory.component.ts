import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-dormitory',
  templateUrl: './dormitory.component.html',
  styleUrls: ['./dormitory.component.scss']
})
export class DormitoryComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public dormitoryList:any;
public dormitoryForm: FormGroup;
public name:any = '';
public fare:number;
public erp_id:any;
public room_num:any;
public room_type:any;
public session:any = '';
public url:any = 'http://localhost:3000';
public alldormitory:any;
public editMode:boolean;
public id:any;
  constructor(public http: Http) {
  this.initializeForm();


}

ngOnInit() {
     this.getalldormitory();
  }
  
getalldormitory(){
 this.http.post((this.url+'/dormitory/dormitory_get_all'),{})
 .subscribe((dormitory)=>{
   console.log(dormitory.json());
   this.alldormitory = dormitory.json();
   //this.dormitoryList = _.pluck(this.alldormitory,'name');
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
   this.dormitoryForm = new FormGroup({
  		"name": new FormControl(this.name,Validators.required),
      "erp_id": new FormControl(this.erp_id,Validators.required), 
      "fare": new FormControl(this.fare,Validators.required),
      "room_num": new FormControl(this.room_num,Validators.required),
      "room_type": new FormControl(this.room_type,Validators.required),
  		"session": new FormControl(this.session,Validators.required)
   });
  }
  
  putdormitory(value){
  	 console.log(value);
 
  	// let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
    this.http.post((this.url+'/dormitory/dormitory'),{
    	"name":value.name,
      "erp_id": value.erp_id,
      "fare": value.fare,
      "room_num": value.room_num,
      "room_type": value.room_type,
      "session": value.session


    }).subscribe((dormitory:any)=>{
        this.getalldormitory();
           // this.getStaffMethod(value.type);
              	   
        });    
  }

  putEditedDormitory(value){
    console.log(value);

    this.http.post((this.url+ '/dormitory/dormitory_edit'),{
      "_id":this.id,
      "name":value.name,
      "erp_id": value.erp_id,
      "fare": value.fare,
      "room_num": value.room_num,
      "room_type": value.room_type,
      "session": value.session

    }).subscribe((editeddormitory)=>{
      console.log(editeddormitory.json());
      this.getalldormitory();

    })
  }
 
 changeRoomType(value){
   this.room_type = value;
 }


  addDormitory(){
  	  this.editMode = false;
      this.id = '';     
  	  this.name = '';
      this.room_num= '';
      this.room_type = '';
      this.fare = 0;
      this.erp_id = '';
  		this.session = '';
      this.initializeForm();
      console.log(this.dormitoryForm);
      this.openMyModal('effect-13');

    

  }

  editDormitory(index){
     this.editMode = true;
     this.id = (this.alldormitory[index])._id;
  	 this.name = (this.alldormitory[index]).name;
     this.room_num= (this.alldormitory[index]).room_num;
     this.erp_id= (this.alldormitory[index]).erp_id;
     this.room_type = (this.alldormitory[index]).room_type;
     this.fare = (this.alldormitory[index]).fare;
  	 this.session = (this.alldormitory[index]).session;
     this.initializeForm();
     console.log(this.dormitoryForm);
     this.openMyModal('effect-13');
  }
}
