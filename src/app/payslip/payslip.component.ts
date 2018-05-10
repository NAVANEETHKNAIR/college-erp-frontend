import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as number2text from 'number2text'

//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {
  
public monthArray:any = ['January','February', 'March', 'April' , 'May', 'June' , 'July', 'August', 'September', 'October', 'November', 'December'];
public totalAllowance:number;
public totalDeduction:number;
public netSalary:number;
public netSalaryInWords:any;
public looplen:any;
public loopLenArray:any;
 @Input('payslip') payslip:any;
 @Input('payslipfor') payslipfor:any;
 @Output('editPayslip') valueChange = new EventEmitter();

 constructor(private http: Http){
   
 }

 ngOnInit(){
   console.log("payslip:",this.payslip);
   console.log("payslipfor:",this.payslipfor);
   let totalAllowanceArray = _.map(this.payslip.allowances,function(num:any){
     return +num.amount;
   });
   this.totalAllowance= _.reduce(totalAllowanceArray, function(memo, num){ return memo + num; }, 0);
    
   let totalDeductionArray = _.map(this.payslip.deductions,function(num:any){
     return +num.amount;
   });
   this.totalDeduction= _.reduce(totalDeductionArray, function(memo, num){ return memo + num; }, 0);

   this.netSalary = this.totalAllowance - this.totalDeduction + (+this.payslip.basic_sal);
   this.netSalaryInWords = number2text(this.netSalary);
   this.looplen =  (this.payslip.allowances.length>this.payslip.deductions.length?this.payslip.allowances.length:this.payslip.deductions.length)
   this.loopLenArray = this.looplenArrayMethod(this.looplen);
 }
  
 looplenArrayMethod(count:number){
     let arr = [];
     for(let i=0;i<count;i++){
       arr.push(i);
     }
     console.log(arr);
     return arr;
 }

 editPayslipMethod(){
   this.valueChange.emit(false);
 }
 

}