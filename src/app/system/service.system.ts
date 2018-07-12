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
 public url:any = 'http://159.89.171.240:3000';
 public sessionData:any;
 public cookie: any;
 public userId: any;
 public overdue:number = 1;
 public msg91Id:any;
 public reportSession:any;
 constructor(private http:Http,private cookieService: CookieService){
 	this.cookie = this.cookieService.getAll()['cookieSet'];
  
 }
  



 getSession() {

      return this.http.post(this.url + '/system/system_get_session',{"access_token":this.cookie})
            .map(res => {return res.json()})
            .do((data) => {
            	console.log(data);
              this.sessionData = data;
              if(!this.reportSession){
                this.reportSession = data.session;
                console.log('current session in get session:',this.reportSession);
              }

            });
    
  }

  getReportSession(){
    return this.reportSession;
  }

 changeReportSession(session){
   this.reportSession = session;
 }


  getOverdue(){
    console.log('returning overdue:',this.overdue);
    return this.overdue;
  }


  upload(fileToUpload: any) {
    let input = new FormData();
    input.append("image", fileToUpload);
    //input.append("access_token",this.cookie);

    return this.http.post(this.url + "/upload/upload", input);
}


  editupload(fileToUpload: any,imageId:any) {
    let input = new FormData();
    input.append("image", fileToUpload);
    input.append("image_id",imageId);
    //input.append("access_token",this.cookie);
    console.log("edit pic",input);
    return this.http.post(this.url + "/upload/edit", input);
}




  getUser(){
   this.cookie = this.cookieService.getAll()['cookieSet'];
   let user = (this.cookieService.getAll()['userSet']).toLowerCase();
   
   return this.http.post(this.url + '/' + user + '/' + user + '_get_for_user_id',{
        user_id: this.cookieService.getAll()['idSet'],
        session: this.sessionData.session,
        access_token: this.cookie
   }).map(res=>{
     return res.json()
   }).do((data)=>{
     console.log("userId",data);
     this.userId = data;
   
   })

}

  getMSG91(){
     this.cookie = this.cookieService.getAll()['cookieSet'];
      return this.http.post(this.url+ '/msg91/get_msg91',{
        access_token: this.cookie
      }).map(res=>{
     return res.json()
   }).do((data)=>{
     console.log("msg91Id",data);
     this.msg91Id = data;
   })
  
 }  

}


