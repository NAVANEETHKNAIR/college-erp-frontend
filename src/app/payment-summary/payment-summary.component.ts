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
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {

public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
// public staffList:any;
// public sectionForm: FormGroup;
// public staffType:any[] = ['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER STAFF'];
public session:any = '';
public url:any = 'http://159.89.171.240:3000';
public cookie:any;
public paymentList = [];

  constructor(public http: Http,public fetchsession:SystemService,private cookieService: CookieService, private swal: SwalService) {
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    
    this.http.post(this.url+'/payment/payment-summary',{
      access_token: this.cookie
    }).subscribe((payment)=>{
      this.paymentList = payment.json();
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
