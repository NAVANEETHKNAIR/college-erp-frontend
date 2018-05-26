import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class SystemService {
 public url:any = 'http://localhost:3000';
 public sessionData:any;
 public cookie: any;
 constructor(private http:Http,private cookieService: CookieService){
 	this.cookie = this.cookieService.getAll()['cookieSet'];
 }

 

 getSession() {
    if (this.sessionData) {
      console.log("yeah this is...");
      return Observable.of(this.sessionData);
    } else {
      return this.http.post(this.url + '/system/system_get_session',{"access_token":this.cookie})
            .map(res => {return res.json()})
            .do((data) => {
            	console.log(data);
              this.sessionData = data;
            });
    }
  }
  
}