import { Injectable,OnInit,OnChanges } from '@angular/core';
import { CanActivate, ActivatedRoute,ActivatedRouteSnapshot, Router,RouterStateSnapshot,CanActivateChild	} from '@angular/router';
import { CookieService } from 'ng2-cookies';
import { Http } from '@angular/http';
import * as _  from 'underscore';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardService implements CanActivate,CanActivateChild{

public cookie:any;
  constructor(public http: Http, public cookieService: CookieService, public route: Router) {
     this.cookie = this.cookieService.getAll()['cookieSet'];
  console.log("Only constructor is running");
}



  canActivate(){
  	this.cookie = this.cookieService.getAll()['cookieSet'];
  	console.log("Welcome to Login Guard");
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
  
    canActivateChild(){
  	this.cookie = this.cookieService.getAll()['cookieSet'];
  	console.log("Welcome to Login Guard");
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

export class RolesGuardAuthorizeGuardService implements CanActivate{
	public user:any;
	constructor(public cookieService: CookieService, public router: Router){
	}

	canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
       if(_.includes(route['data']['roles'],this.cookieService.getAll()['userSet'])){
       	return true;
       }

       else {
       	  this.router.navigate(['404'],{skipLocationChange:true})
     	   return false;
       }
	}
}

