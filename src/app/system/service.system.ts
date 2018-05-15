import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SystemService {
 public url:any = 'http://localhost:3000';
 public sessionData:any;
 constructor(private http:Http){
 	
 }

 

 getSession() {
    if (this.sessionData) {
      console.log("yeah this is...");
      return Observable.of(this.sessionData);
    } else {
      return this.http.post(this.url + '/system/system_get_session',{})
            .map(res => {return res.json()})
            .do((data) => {
            	console.log(data);
              this.sessionData = data;
            });
    }
  }
  
}