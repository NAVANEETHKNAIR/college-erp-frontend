import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { Router } from '@angular/router'
//import * as io from 'socket.io-client';
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
  
})
export class StudentdashboardComponent implements OnInit {
  public refresh: Subject<any> = new Subject(); 
  public cookie:any;
  public  viewDate: Date = new Date();
  public session:any;
  public url:any = 'http://159.89.171.240:3000';
  public events:any = [];
  public activeDayIsOpen:any;
  public view = 'month';
  public user:any;
  public userdetail:any;
  public isUser:boolean = false;
  public currentSession:any;
  public socket:any;
  public paymentString = '';
 constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService, private router: Router) {
   // this.socket = io.connect('http://159.89.171.240:3000/');
   // this.socket.on('connect', (socket)=> {
   //  console.log('Connected!');
   // });
   // this.socket.on('payment',(value)=>{
   //    console.log(value);
   //    this.paymentString = 'Balance of Rs. ' + value.student_count*1 + ' is due till date '+ (new Date()).toLocaleDateString();
   // })
  //this.socket.emit('CH01', 'me', 'test msg');
   let date = (new Date()).toLocaleDateString().split('/');

   let dateString = (date[2]+ '-'+ ((+date[0]>10)?date[0]:('0' + date[0])) + '-01');
   this.cookie = this.cookieService.getAll()['cookieSet'];
   if(this.cookieService.getAll()['userSet'] === 'ADMIN'){
     this.http.post(this.url+ '/payment/payment',{
       date: dateString,
       access_token: this.cookie
     }).subscribe((payment:any)=>{
       console.log(payment);
       payment = payment.json();
       this.paymentString = 'Balance of Rs. ' + payment.student_count*30 + ' is due till date '+ (new Date()).toLocaleDateString();
     })
   }  
   console.log(this.cookie);
   this.fetchsession.getSession().subscribe((session)=>{
   this.currentSession = session.session;
    this.session = this.fetchsession.getReportSession();
     console.log('current session:', this.currentSession);
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
 