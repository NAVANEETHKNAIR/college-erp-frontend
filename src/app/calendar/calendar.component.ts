import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

public activeDayIsOpen:any;
public  viewDate: Date = new Date();
public view = 'month';
//public events:CalendarEvent[] = [];
public events:CalendarEvent[] = [{
  
  start: new Date(),
  title: 'An event',
  color: { primary: 'green', secondary: 'string'},
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
  color: { primary: 'green', secondary: 'string'},
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

}


ngOnInit(){

}

dayClicked(value){
	console.log(value);
}

eventClicked(value){
	console.log(value);
}

}