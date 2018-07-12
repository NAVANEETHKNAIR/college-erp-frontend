import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{

public cookie:any;
public user:any;
public session:any;
public url:any = 'http://159.89.171.240:3000'
public userDetail:any;
public img='';
constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.userDetail = this.cookieService.getAll()['userSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
        
        	let user = this.userDetail.toLowerCase();
        	this.http.post(this.url+ '/' + user + '/' + user + '_get_for_user_id',{
        		session: this.session,
        		user_id: this.cookieService.getAll()['idSet'],
        		access_token: this.cookie
        	}).subscribe((userInfo)=>{
        		console.log(userInfo.json());
        		this.user = userInfo.json();
            if(this.user.image){
              this.img = this.url + '/uploads/' + this.user.image.filename;
            }
        	})
        

  });
  
  }



}