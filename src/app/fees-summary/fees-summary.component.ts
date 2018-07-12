import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
import { SwalService } from '../swal/swal.service';
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-fees-summary',
  templateUrl: './fees-summary.component.html',
  styleUrls: ['./fees-summary.component.scss']
})
export class FeesSummaryComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public url:any = 'http://159.89.171.240:3000';
public session:any;
public cookie:any;
public feesList:any;
//import { SystemService } from '../system/service.system';
  constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService, private swal: SwalService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
   this.http.post(this.url+ '/fees/fees_summary',{
     session: this.session,
     access_token: this.cookie
   }).subscribe((fees)=>{
     console.log(fees.json());
     this.feesList = fees.json();
   })

    
  });
  
 

}

  ngOnInit() {

  }

 
  

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

 
}
