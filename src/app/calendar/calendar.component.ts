import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

public refresh: Subject<any> = new Subject();
public calendarForm: FormGroup;
public activeDayIsOpen:any;
public  viewDate: Date = new Date();
public view = 'month';
public title:string = '';
public start:any = '';
public end:any = '';
public type:any = '';
public color:any;
public editMode:boolean = false;
public index:number;
public url:any = 'http://localhost:3000';
public session:any;
public idList:any[] = [];
//public events:CalendarEvent[] = [];
public events:CalendarEvent[] = [];
public cookie:any;

constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService) {
    this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    this.initializeForm();
    this.http.post(this.url + '/calendar/calendar_get_all',{
    	session: this.session,
      access_token: this.cookie

    }).subscribe((subscribedEventArray:any)=>{
    	// eventArray.map((event)=>{
    	// 	this.events.push({
    	// 		title: event.title
    	// 	})
    	// })
       let eventArray = subscribedEventArray.json();
      for(let i=0;i<eventArray.length;i++){
      	this.events.push({
      		title: eventArray[i]['title'],
      		start: startOfDay(this.dateMaker(eventArray[i]['start'])),
      		end: endOfDay(this.dateMaker(eventArray[i]['end'])),
      		color: this.colorType((eventArray[i]['type']))

      	})
        
      	this.idList.push(eventArray[i]['_id']);
      }
      this.refresh.next();
      console.log("events glimpse:",this.events);
    })
    
  });
   this.initializeForm();
  

  }


ngOnInit(){

}

initializeForm(){
	this.calendarForm = new FormGroup({
	
     "title" : new FormControl(this.title, Validators.required),
   	 "start" : new FormControl(this.start, Validators.required),
   	 "end" : new FormControl(this.end, Validators.required),
     "type" : new FormControl(this.type, Validators.required)
	})
}

createEvent(value){
    console.log(value);
   	this.color = this.colorType(value.type);
    let endType = value.end.split("-");
    //converting "25-02-2018" in 
    let end = new Date(endType[0],(+endType[1]-1),endType[2]);
   //this.events.push(this.calendarForm.controls['eventArray']['controls'][this.calendarForm.controls['eventArray']['controls'].length-1]) 
  

 console.log(this.events);
 
 this.http.post( this.url+ '/calendar/calendar',{
  title: value.title,
  start: this.dateFormatter(value.start),
  end: value.end,
  type: value.type,
  session: this.session,
  access_token: this.cookie
 }).subscribe((event)=>{
 	console.log(event.json());
 	 this.events.push({
	title:value.title,
	start: startOfDay(value.start),
	end : endOfDay(end),
	color : this.color
    })
 	 this.idList.push(event.json()._id);
 	 this.refresh.next();
 })

}

editEvent(value){
  this.color = this.colorType(value.type);
  //console.log(value);
  console.log("event  index");
  console.log(this.events[this.index]);
  // let endType = value.end.split("-");
  // let end = new Date(endType[0],(+endType[1]-1),endType[2]);
  //console.log(end);
  let end = this.dateMaker(value.end);
   
 this.http.post( this.url+ '/calendar/calendar_edit',{
  _id: this.idList[this.index],
  title: value.title,
  start: this.dateFormatter(value.start),
  end: value.end,
  type: value.type,
  session: this.session,
  access_token: this.cookie
 }).subscribe((event)=>{
 	console.log("saved successfully:",event.json());
   this.events[this.index] = {
  	title:value.title,
	start: startOfDay(value.start),
	end : endOfDay(end),
	color : this.color
   }
 	 this.refresh.next();
 })


   //console.log(this.index);

   //this.refresh.next();
   console.log(this.events);
}  

dayClicked(value){
	console.log(value);
	this.editMode = false;
	console.log(startOfDay(value.date));
	this.title = '';
	this.start = startOfDay(value.date);
	let getdate = '';
	let getmonth = '';
	this.editMode = false;

	(value.date.getDate()<10) ? getdate = '0' + value.date.getDate():getdate = value.date.getDate();
	(value.date.getMonth()<10) ? getmonth = '0' + (+value.date.getMonth()+1):getmonth = (+value.date.getMonth()+1).toString();

	this.start = value.date.getFullYear() + "-" + getmonth + "-" + getdate;
	this.end = '';
	this.type = '';
	this.initializeForm();
	// this.viewDate = addDays(startOfDay(new Date()),4)
	this.openMyModal('effect-13');
}

 openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

colorType(value){
  if(value == 'HOLIDAY'){
  	return { primary: 'green' , secondary: '#adf6dc'}
  }

  else if(value == 'MEETING'){
  	return { primary: 'yellow' , secondary: 'yellow'}
  }

  else {
    return { primary: 'blue' , secondary: '#b5bafd'}
  }
}

eventType(value){ 
	if(_.isEqual(value,{primary: 'green' , secondary: '#adf6dc'})){
		
		return 'HOLIDAY'
	}

	else if(_.isEqual(value ,{primary: 'yellow' , secondary: 'yellow'})){
		
		return 'MEETING'
	}

	else{

      return 'EXAM'
	}
}

eventClicked(value){
	console.log(value);
}

handleEvent(action,value){
  console.log(value);
  this.editMode = true;
 
  let getdate = '';
  let getmonth = '';
  this.title = value.title;
  this.start = value.start;
  this.end = this.dateFormatter(value.end);
  console.log("Before passing through value color is:",value.color);
  this.type = this.eventType(value.color);
  console.log('type',this.type);



  // this.index = this.events.map((event)=>{
  // 	console.log(event.title);
  // 	return event.title;

  // }).lastIndexOf(value.title);
  //indexOf(value.title);

  this.initializeForm();

  this.openMyModal('effect-13');
  this.refresh.next();
  for(let i=0;i<this.events.length;i++){
      if(_.isEqual(this.events[i],{title:value.title,start:value.start,end:value.end,color:value.color})){
      	this.index = i;
      	break;
      }
      
  }
}

dateFormatter(value){
	value = startOfDay(value);
	console.log(value);
	let getdate = '';
	let getmonth ='';
    (value.getDate()<10) ? getdate = '0' + value.getDate():getdate = value.getDate();
    (value.getMonth()<10) ? getmonth = '0' + (+value.getMonth()+1):getmonth = (+value.getMonth()+1).toString();
     return value.getFullYear() + "-" + getmonth + "-" + getdate;
}

dateMaker(value){
	let endType = value.split("-");
    //converting "25-02-2018" in 
    let end = new Date(endType[0],(+endType[1]-1),endType[2]);
    return end;

}

}

