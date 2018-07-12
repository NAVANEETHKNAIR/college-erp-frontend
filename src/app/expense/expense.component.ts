import { Component, OnInit, ViewChild, ElementRef,TemplateRef} from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ng2-cookies';
import { SystemService } from '../system/service.system';
import { SwalService } from '../swal/swal.service';
//private cookieService: CookieService
//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
@ViewChild('modalSmall') modalSmall:any;
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public expenseList:any[] = [];
public expenseForm: FormGroup;
public name:any = '';
public session:any = '';
public url:any = 'http://159.89.171.240:3000';
public allSubject:any;
public editMode:boolean;
public id:any;
public cookie:any;
public categoryList:any[] = []; 
public title:any;
public amount:any;
public category:any;
public categoryExist:boolean = false;
public date:any;
public categoryNew:any = "";
public currentSession:any;
  constructor(public http: Http,
    public fetchsession:SystemService, 
    public parseFormatter:NgbDateParserFormatter,
    public datePickerService:NgbDatepickerConfig,
    private cookieService: CookieService,
    private swal: SwalService){
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    
     this.currentSession = session.session;
    this.session = this.fetchsession.getReportSession();
    console.log("session from session service",this.session);
    this.initializeForm();
    console.log(this.expenseForm);
      console.log('session in oninit:',this.session)
     this.http.post(this.url+ '/expense/category_get_all',{
       session:this.session,
       access_token: this.cookie
     }).subscribe((categories:any)=>{
       categories = categories.json();
       console.log(categories);
       if(typeof categories!=='string'){
            this.categoryList = categories;
       }


 })
    
  });
  this.initializeForm();
}
ngOnInit() {

}
  
getExpense(value){
  this.http.post(this.url+ '/expense/get_expense_for_category',{
    category:value,
    session:this.session,
    access_token:this.cookie
  }).subscribe((expense)=>{ 
    if(expense.json()){
      this.expenseList = expense.json();
    }
  })

}





  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }
  
  closeMyModal(event) {
    console.log(event);
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  initializeForm(){
   this.expenseForm = new FormGroup({
  		"title": new FormControl(this.title,Validators.required),
      "date": new FormControl(this.title,Validators.required),
      "category": new FormControl(this.category,Validators.required),
      "amount": new FormControl(this.amount,Validators.required),
  		"session": new FormControl(this.session,Validators.required)
   });
  }

  categoryAdd(){
  this.modalSmall.dialogClass= "'modal-sm'";
   this.modalSmall.show();
  }

  categorySave(value){
    this.http.post(this.url+ '/expense/category',{
      category:value,
      session: this.session,
      access_token: this.cookie

    }).subscribe((categorySaved:any)=>{
      categorySaved = categorySaved.json();
      if(typeof categorySaved!== 'string' ){
         this.categoryList.push(categorySaved);
         this.categoryExist = false;
         this.categoryNew = "";
         this.modalSmall.hide();
         this.swal.openSuccessSwal(); 
      }
      else{
        this.categoryExist = true;

      }


    })
  }

  putExpense(value,event){
     this.http.post(this.url+ '/expense/expense',{
       title: value.title,
       amount: value.amount,
       category:value.category,
       date: this.parseFormatter.format(value.date),
       session: this.session,
       access_token: this.cookie
     }).subscribe((expense)=>{
       console.log(expense.json());
       this.getExpense(value.category);
       event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('md-show');
       this.swal.openSuccessSwal(); 
     })
  }
  
  putEditedExpense(value,event){
     this.http.post(this.url+ '/expense/expense',{
       _id: this.id,
       title: value.title,
       amount: value.amount,
       category:value.category,
       date: this.parseFormatter.format(value.date),
       session: this.session,
       access_token: this.cookie
     }).subscribe((expense)=>{
       console.log(expense.json());
       event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('md-show');
       this.swal.openSuccessSwal(); 
       this.getExpense(value.category);
     })
  }

  addExpense(){
    this.editMode = false;
    this.title = '';
    this.amount = '';
    this.category = '';
    this.date = '';
    this.initializeForm();
    this.openMyModal('effect-13');
  }

  editExpense(i){
    this.editMode = true;
    this.id = this.expenseList[i]['_id'];
    this.title = this.expenseList[i]['title'];
    this.amount = this.expenseList[i]['amount'];
    this.date = this.parseFormatter.parse(this.expenseList[i]['date']);
    this.category = this.expenseList[i]['category']['_id'];
    this.initializeForm();
    this.openMyModal('effect-13');
  }

}
