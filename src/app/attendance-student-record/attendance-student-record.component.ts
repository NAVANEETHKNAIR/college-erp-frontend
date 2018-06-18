import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepickerConfig  } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ng2-cookies';
import { SystemService } from '../system/service.system';


@Component({
  selector: 'app-attendance-student-record',
  templateUrl: './attendance-student-record.component.html',
  styleUrls: ['./attendance-student-record.component.scss']
})
export class AttendanceStudentRecordComponent implements OnInit {
  
 public cookie:any;
 public session:any;
 public url:any = 'http://localhost:3000';
 public totalAttendance:any;
 public attendanceList:any;
 public filteredAttendanceList:any;
 public rowsOnPage = 10;
 public filterQuery = '';
 public sortBy = '';
 public sortOrder = 'desc';
 public startDate:any;
 public endDate:any;
 public dateCorrect = true;
 public minDate :any;
 public maxDate : any;
 public len:any;
 public filteredAttendance:any;
 public user:any;
  constructor(public http: Http, public fetchsession:SystemService, private cookieService: CookieService,public datePickerService:NgbDatepickerConfig,public parseFormatter:NgbDateParserFormatter){
   this.cookie = this.cookieService.getAll()['cookieSet'];
   this.fetchsession.getSession().subscribe((session)=>{
    this.session = session.session;
    console.log("session from session service",this.session);
    this.user = this.cookieService.getAll()['userSet'].toLowerCase();
    this.getAttendance();
   
    
  });
   
}

getAttendance(){
  
 this.fetchsession.getUser().subscribe((user)=>{
    console.log(user._id);
  	this.http.post(this.url + '/attendance/attendance_'+ this.user +'_day',{
  		class_ref: user.class_ref,
  		session: this.session,
  		student_id : user._id,
  		access_token : this.cookie
  	}).subscribe((userArray)=>{
  		console.log(userArray.json())
  		this.attendanceList = userArray.json();
  		this.filteredAttendanceList = this.attendanceList.slice()
  	
  		let count = 0;
  		this.len = this.attendanceList.length;
  		for(let i=0;i<this.len;i++){
  			if(this.attendanceList[i]['status'] === 'Present'){
             count++;
  			}
  		}

  		this.datePickerService.minDate = this.attendanceList[0]['date'];
  		this.totalAttendance = +(((count/this.len)*100).toFixed(2))
  		this.filteredAttendance = this.totalAttendance;
  		let mindate = this.attendanceList[0]['date'].split()
  		this.minDate = {day:mindate[2],month:mindate[1],year:mindate[0]}

  		let maxdate = this.attendanceList[this.attendanceList.length -1]['date'].split()
  		this.maxDate = {day:maxdate[2],month:maxdate[1],year:maxdate[0]}

  	})

  })

}

//2018-05-21 startDate 2018-05-16 2018-05-18 2018-05-22

filterAttendance(startDate,endDate){

  console.log('StartDate:',this.parseFormatter.format(startDate));
  console.log('endDate:', this.parseFormatter.format(endDate));
  let startIndex = 0;
  let endIndex = 0;
  let fromDate = this.parseFormatter.format(startDate);
  let toDate =   this.parseFormatter.format(endDate);
  let i=0;
  let j=0;
  console.log(this.len); 
  console.log(i);
  if(fromDate < toDate && fromDate <= this.attendanceList[this.len-1]['date'] ||  endDate <= this.attendanceList[this.len-1]['date']){
     this.dateCorrect = true;
     while(i < this.len){

  	console.log(fromDate);
  	console.log(this.attendanceList[i]['date']);
  	console.log((fromDate <= this.attendanceList[i]['date']));
  	if(fromDate <= this.attendanceList[i]['date']){
      startIndex = i;
      break;
  	}
  	i++;
   }


   if(i == this.len){
   	startIndex = this.len -1;
   }

   while(j+startIndex < this.len){
   	if(toDate == this.attendanceList[j+startIndex]['date']){
   		endIndex = j+startIndex;
   		console.log("ankit",j)
   		break;
   	}

   	else if(toDate < this.attendanceList[j+startIndex]['date']){
   		endIndex = j+startIndex-1;
   		console.log("anurag",j)
   		break;
   	}
    
    else{
    	j++;

    }

    }




    if(j + startIndex == this.len){
    	endIndex = this.len -1;
    	console.log("archita",j)
    }	
  }

  else{
  	this.dateCorrect = false;
  	startIndex = this.len;
  	endIndex = this.len; 
  }

     
    this.filteredAttendanceList = this.attendanceList.slice(startIndex,endIndex+1);
    let filterlen = this.filteredAttendanceList.length;
    let count = 0;
    for(let i=0;i<filterlen;i++){
  			if(this.filteredAttendanceList[i]['status'] === 'Present'){
             count++;
  			}
  		}
  	this.filteredAttendance = +(((count/filterlen)*100).toFixed(2));
    console.log("attendance list:",this.attendanceList);
    console.log("Start index:", startIndex);
    console.log("End Index:", endIndex);
   }


ngOnInit(){
 
 }


}

  



// filterAttendance(startDate,endDate){

//   console.log('StartDate:',this.parseFormatter.format(startDate));
//   console.log('endDate:', this.parseFormatter.format(endDate));
//   let startIndex = 0;
//   let endIndex = 0;
//   let fromDate = this.parseFormatter.format(startDate);
//   let toDate =   this.parseFormatter.format(endDate);
//   if(fromDate <= endDate && fromDate <= this.attendanceList[this.attendanceList.length-1]['date']){
//    for(let i=0;i<this.attendanceList.length;i++){
//   	if(fromDate <= (this.attendanceList[i]['date'])){
//        startIndex = i; 
// 	   break;  	 
//   	}

//   	//2018-05-15 2018-05-10


  	

  	
//   }

//   for(let i= startIndex;i<this.attendanceList.length;i++){
     
//   	if(endDate === (this.attendanceList[i]['date'])){
//   	   endIndex = i;
//   	   break;
//     }

//     else if(endDate < (this.attendanceList[i]['date'])){
//         endIndex = i-1;
//         break;
//     }

//     else{
//     	endIndex = this.attendanceList.length-1;
//     }
  
  
//   this.filteredAttendanceList = this.attendanceList.slice(startIndex,endIndex);
//   console.log('startIndex:', startIndex);
//   console.log('endIndex:', endIndex);


//   }	
//   }
//   else{
//   	  this.dateCorrect = false;
//       return;
//   }

  
// }









