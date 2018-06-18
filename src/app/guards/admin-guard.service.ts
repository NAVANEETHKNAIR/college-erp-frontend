import { Injectable,OnInit,OnChanges } from '@angular/core';
import { CanActivate, ActivatedRoute,ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ng2-cookies';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

public cookie:any;
  constructor(public http: Http, public cookieService: CookieService, public route: Router) {
     this.cookie = this.cookieService.getAll()['cookieSet'];
  console.log("Only constructor is running");
}



  canActivate(){
  	this.cookie = this.cookieService.getAll()['cookieSet'];
    if(!this.cookie){
      console.log('This guard is dope');
       this.route.navigate(['login']);
  	  return false;
    }

    

    else{
    	console.log(this.cookieService.getAll())
    	return true;
    }
  	
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthorizeGuardService implements CanActivate {
  public user:any;
  constructor(public http: Http, public cookieService: CookieService, public route: Router) {
  this.user = this.cookieService.getAll()['userSet']
}
  canActivate(){
      
      if(this.cookieService.getAll()['userSet'] === 'ADMIN'){
    	return true;
    }
     else{
     	this.route.navigate(['404'],{skipLocationChange:true})
     	return false;
     }
  }
}

@Injectable({
  providedIn: 'root'
})
export class StudentAuthorizeGuardService implements CanActivate {
  public user:any;
  constructor(public http: Http, public cookieService: CookieService, public route: Router) {
  this.user = this.cookieService.getAll()['userSet']
}
  canActivate(){
      
      if(this.cookieService.getAll()['userSet'] === 'STUDENT'){
    	return true;
    }
      else{
     	this.route.navigate(['404'],{skipLocationChange:true})
     	return false;
     }
  }
}

@Injectable({
  providedIn: 'root'
})
export class LibrarianAuthorizeGuardService implements CanActivate {
  public user:any;
  constructor(public http: Http, public cookieService: CookieService, public route: Router) {
  this.user = this.cookieService.getAll()['userSet']
}
  canActivate(){
      
      if(this.cookieService.getAll()['userSet'] === 'LIBRARIAN'){
    	return true;
    }
      else{
     	this.route.navigate(['404'],{skipLocationChange:true})
     	return false;
     }
  }
}

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthorizeGuardService implements CanActivate {
  public user:any;
  constructor(public http: Http, public cookieService: CookieService, public route: Router) {
  this.user = this.cookieService.getAll()['userSet']
}
  canActivate(){
      
      if(this.cookieService.getAll()['userSet'] === 'TEACHER'){
    	return true;
    }
      else{
     	this.route.navigate(['404'],{skipLocationChange:true})
     	return false;
     }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AccountantGuardService implements CanActivate {
  public user:any;
  constructor(public http: Http, public cookieService: CookieService, public route: Router) {
  this.user = this.cookieService.getAll()['userSet']
}
  canActivate(){
      
      if(this.cookieService.getAll()['userSet'] === 'ACCOUNTANT'){
    	return true;
    }
      else{
     	this.route.navigate(['404'],{skipLocationChange:true})
     	return false;
     }
  }
}

@Injectable({
  providedIn: 'root'
})
export class OtherAuthorizeGuardService implements CanActivate {
  public user:any;
  constructor(public http: Http, public cookieService: CookieService, public route: Router) {
  this.user = this.cookieService.getAll()['userSet']
}
  canActivate(){
      
      if(this.cookieService.getAll()['userSet'] === 'OTHER'){
    	return true;
    }
      else{
     	this.route.navigate(['404'],{skipLocationChange:true})
     	return false;
     }
  }
}