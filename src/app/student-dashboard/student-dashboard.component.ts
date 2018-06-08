import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { Router } from '@angular/router'

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


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentdashboardComponent implements OnInit {
  public refresh: Subject<any> = new Subject(); 
  public cookie:any;
  public  viewDate: Date = new Date();
  public session:any;
  public url:any = 'http://localhost:3000';
  public events:any = [];
  public activeDayIsOpen:any;
  public view = 'month';
  public user:any;
  public userdetail:any;
  public isUser:boolean = false;

 constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService, private router: Router) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   console.log(this.cookie);
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    console.log('Hitting....');
    
    this.http.post(this.url + '/calendar/calendar_get_all',{
    	session: this.session,
      access_token: this.cookie

    }).subscribe((subscribedEventArray:any)=>{
        console.log('Hitted');
       let eventArray = subscribedEventArray.json();
       console.log("eventArray:",eventArray);
      for(let i=0;i<eventArray.length;i++){
      	this.events.push({
      		title: eventArray[i]['title'],
      		start: startOfDay(this.dateMaker(eventArray[i]['start'])),
      		end: endOfDay(this.dateMaker(eventArray[i]['end'])),
      		color: this.colorType((eventArray[i]['type']))

      	})
      }
      this.refresh.next();
    })
   this.user = (this.cookieService.getAll()['userSet']).toLowerCase();
   if(this.user!== 'admin')
   this.http.post(this.url + '/' + this.user + '/' + this.user + '_get_for_user_id',{
        user_id: this.cookieService.getAll()['idSet'],
        session: this.session,
        access_token: this.cookie
   }).subscribe((userDetail)=>{
   	console.log(userDetail.json());
   	this.userdetail = userDetail.json();
   	this.isUser = true;
   })

})

}
   

ngOnInit() {}

  dateMaker(value){
	let endType = value.split("-");
    //converting "25-02-2018" in 
    let end = new Date(endType[0],(+endType[1]-1),endType[2]);
    return end;

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

logout(){
	this.cookieService.deleteAll();
	this.router.navigate(['login']);
}

}
