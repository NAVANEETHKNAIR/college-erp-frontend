import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit{

public loginForm: FormGroup;
public username:any;
public password:any;
public url:any = 'http://localhost:3000';
public trueUser:boolean = true;
constructor(private http:Http,private cookieService: CookieService){
 
 this.initializeForm();
}


ngOnInit(){

}

initializeForm(){
  this.loginForm = new FormGroup({
    "username": new FormControl("",[Validators.required,Validators.email]),
    "password": new FormControl("",[Validators.required])
  })
}

putLogin(value){
  this.http.post(this.url + '/user/login',{
    username: value.username,
    password: value.password
  }).subscribe((token:any)=>{
    console.log(token.json());
     token = token.json();
     if(typeof(token) === 'string'){
       this.trueUser = false;
     }
     else{
       this.trueUser = true;
       this.cookieService.set('cookieSet',token.access_token);
       console.log(this.cookieService.getAll());
     }
  })
}

}


