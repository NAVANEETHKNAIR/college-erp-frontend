import { Component, OnInit, AfterViewInit,NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
public cookie:any;
constructor(private http:Http,private cookieService: CookieService, public router: Router,public seeRoute: ActivatedRoute, public _ngZone: NgZone){
 
 this.initializeForm();
}


ngOnInit(){

}

initializeForm(){
  this.loginForm = new FormGroup({
    "username": new FormControl(this.username,[Validators.required,Validators.email]),
    "password": new FormControl(this.password,[Validators.required])
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
       this.username = value.username;
       this.password = value.password;
       this.initializeForm();
       this.trueUser = true;
       this.cookieService.set('cookieSet',token.access_token);
       this.cookieService.set('userSet',token.user);
       this.cookieService.set('idSet',token._id);

       console.log(this.cookieService.getAll());
       this.cookie = this.cookieService.getAll()['cookieSet'];
       console.log('Hit this line');
       this.http.post(this.url+'/system/system_get',{
         "access_token": this.cookie
       }).subscribe((system)=>{
         if(this.cookieService.getAll()['userSet'] == 'ADMIN'){
            if(system.json()){
           this.router.navigate(['student-dashboard']);
           console.log('hitted');
           }

           else{
             this.router.navigate(['system']);
           }

         }

         else if(this.cookieService.getAll()['userSet'] == 'SUPERADMIN'){
           this.router.navigate(['create-admin']);
         }

         else{
           this.router.navigate(['student-dashboard']);
         }
        
       })
       
    
           
     }
  })
}

}


