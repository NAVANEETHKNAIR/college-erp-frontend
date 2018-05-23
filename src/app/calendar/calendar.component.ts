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
//public events:CalendarEvent[] = [];
public events:CalendarEvent[] = [{
 
  
  title: 'An event',
  color: { primary: 'blue', secondary: '#b5bafd'},
  start: new Date(),
  end: new Date(2018,4,30)
  //actions?: EventAction[];
  //allDay?: boolean;
  //cssClass?: string;
  // resizable?: {
  //   beforeStart?: boolean;
  //   afterEnd?: boolean;
  // };
   

  // meta?: MetaType;
},{
  
  start: new Date(),
  title: 'An another event',
  color: { primary: 'green', secondary:'#adf6dc'},
  end: new Date(2018,4,30)
  //actions?: EventAction[];
  //allDay?: boolean;
  //cssClass?: string;
  // resizable?: {
  //   beforeStart?: boolean;
  //   afterEnd?: boolean;
  // };
   

  // meta?: MetaType;
}]

constructor(private http: Http){
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
    let end = new Date(endType[0],(+endType[1]-1),endType[2]);
   //this.events.push(this.calendarForm.controls['eventArray']['controls'][this.calendarForm.controls['eventArray']['controls'].length-1]) 
  this.events.push({
	title:value.title,
	start: this.start,
	end : end,
	color : this.color
})
 console.log(this.events);
 this.viewDate = addDays(startOfDay(new Date()),6)
 this.refresh.next();
}

editEvent(value){
  this.color = this.colorType(value.type);
  //console.log(value);
  console.log("event  index");
  console.log(this.events[this.index]);
  let endType = value.end.split("-");
  let end = new Date(endType[0],(+endType[1]-1),endType[2]);
  //console.log(end);
  this.events[this.index] = {title:value.title,
	start: this.start,
	end : end,
	color : this.color
   }

   //console.log(this.index);
   this.refresh.next();
   console.log(this.events);
}  

dayClicked(value){
	console.log(value);
	console.log(startOfDay(value.date));
	this.title = '';
	this.start = startOfDay(value.date);
	let getdate = '';
	let getmonth = '';
	this.editMode = false;

	// (value.date.getDate()<10) ? getdate = '0' + value.date.getDate():getdate = value.date.getDate();
	// (value.date.getMonth()<10) ? getmonth = '0' + (+value.date.getMonth()+1):getmonth = (+value.date.getMonth()+1).toString();

	// this.start = value.date.getFullYear() + "-" + getmonth + "-" + getdate;
	this.end = '';
	this.type = '';
	this.initializeForm();
	this.viewDate = addDays(startOfDay(new Date()),4)
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
   (value.end.getDate()<10) ? getdate = '0' + value.end.getDate():getdate = value.end.getDate();
   (value.end.getMonth()<10) ? getmonth = '0' + (+value.end.getMonth()+1):getmonth = (+value.end.getMonth()+1).toString();
  this.end = value.end.getFullYear() + "-" + getmonth + "-" + getdate;
  console.log("Before passing through value color is:",value.color);
  this.type = this.eventType(value.color);
  console.log('type',this.type);
  this.index = this.events.map((event)=>{
  	console.log(event.title);
  	return event.title;

  }).lastIndexOf(value.title);
  //indexOf(value.title);
  this.initializeForm();
  this.openMyModal('effect-13');
  this.refresh.next();
}



}