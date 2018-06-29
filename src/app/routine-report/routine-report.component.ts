import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import * as _  from 'underscore'; 
import * as moment from 'moment';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SystemService } from '../system/service.system';
import { CookieService } from 'ng2-cookies';
//private cookieService: CookieService

//import { ModalComponent } from '../components/advanced-component
@Component({
  selector: 'app-routine-report',
  templateUrl: './routine-report.component.html',
  styleUrls: ['./routine-report.component.scss']
})



export class RoutineReportComponent implements OnInit,AfterViewInit{
public dayList = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
public data: any;
public rowsOnPage = 10;
public filterQuery = '';
public sortBy = '';
public sortOrder = 'desc';
public routineList:any;
public routineForm: FormGroup;
public name:any = '';
public vehicle_num:any = '';
public erp_id:any;
public fare:number = 0;
public session:any = '';
public url:any = 'http://localhost:3000';
public allroutine:any;
public classList:any;
public editMode:boolean;
public id:any;
public selectClass:any;
public selectSection:any;
public getClassAll:any;
public filterClass:any;
public class_ref:any;
public subject_ref:any;
public teacher_ref:any;
public start_time:any;
public end_time:any;
public day:any;
public getSectionOfClass:any;
public getTeacherAll: any;
public teacherList:any;
public getSubjectAll:any;
public timeTable:any;
public subjectDay:any=[];
public subjectDaySorted = [];
public editedArray:any;
public cookie:any;
public user_id:any;
public user:any;
  //import { SystemService } from '../system/service.system';
  constructor(public http: Http,
    public fetchsession:SystemService, 
    private cookieService: CookieService){
   this.cookie = this.cookieService.getAll()['cookieSet'];
     this.user_id = this.cookieService.getAll()['idSet'];
     this.user = this.cookieService.getAll()['userSet'].toLowerCase();
   this.fetchsession.getSession().subscribe((session)=>{
    
    this.session = session.session;
    console.log("session from session service",this.session);
    if(this.user!=='admin'){
     this.http.post(this.url+ '/' + this.user + '/'+ this.user + '_get_for_user_id',{
          user_id: this.user_id,
          session: this.session,
          access_token: this.cookie
    
    }).subscribe((userDetail:any)=>{
      userDetail = userDetail.json();
   
      let class_ref = userDetail.class_ref;
     this.http.post((this.url+'/routine/routine_get_class'),{class_ref:class_ref,session:this.session, access_token: this.cookie})
         .subscribe((routineOfClass)=>{
           console.log(routineOfClass.json());
           this.routineList = routineOfClass.json();
           this.makeScheduler();

         })
  })
   
   }
  
  })
        
  

  }

ngOnInit() {

}


 ngAfterViewInit(){
 
  
  this.http.post((this.url+ '/teacher/teacher_get_all'),{ access_token: this.cookie,session: this.session})
     .subscribe((data)=>{
       console.log(data.json());
       this.getTeacherAll = data.json();
      

     });

  this.http.post((this.url+ '/subject/subject_get_all'),{ access_token: this.cookie,session:this.session})
     .subscribe((data)=>{
       console.log(data.json());
       this.getSubjectAll = data.json();
      

     });

 }

// getSectionMethod(value){
//    this.selectSection = value;
//    this.class_ref = _.pluck(_.where(this.getClassAll,{name: this.selectClass,section: this.selectSection}),'_id')[0];
//    this.http.post((this.url+'/routine/routine_get_class'),{class_ref:this.class_ref,session:this.session, access_token: this.cookie})
//        .subscribe((routineOfClass)=>{
//          console.log(routineOfClass.json());
//          this.routineList = routineOfClass.json();
//          this.makeScheduler();

//        })
// }

// editSchedule(value){
//    console.log(value);
//    this.editMode = true;
//    this.editedArray = _.where(this.routineList,{_id:value})[0];
//    console.log(this.editedArray);
//    this.id = value;
//    this.start_time = this.editedArray.start_time;
//    this.end_time = this.editedArray.end_time;
//    this.day = this.editedArray.day;
//    this.teacher_ref = (_.where(this.getTeacherAll,{_id:this.editedArray.teacher_ref})[0])['erp_id'];
//    console.log(this.teacher_ref);
//    this.subject_ref = this.editedArray.subject_ref.name;
//    this.initializeForm();
//    this.openMyModal('effect-13');

// }
makeScheduler(){
   this.subjectDay = [];
   this.subjectDaySorted = [];
  for(let i=0;i<this.dayList.length;i++){
    //this.subjectDay.push((_.where(this.routineList,{day:this.dayList[i]})))
       this.subjectDay.push(_.where(this.routineList,{day:this.dayList[i]}));
      for(var eachSubjectDay of this.subjectDay){
        var sortedObjectArray = eachSubjectDay.sort(function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = +a.start_time.replace(":","");
  const genreB = +b.start_time.replace(":","");

          let comparison = 0;
          if (genreA > genreB) {
          comparison = 1;
          } else if (genreA < genreB) {
          comparison = -1;
          }
          return comparison;
          })
        console.log("sortedObjectArray to be pushed:",sortedObjectArray);
       
      }
     this.subjectDaySorted.push(sortedObjectArray);
  }
  console.log("subjectDay:",this.subjectDay);
  console.log("subjectDaySorted:",this.subjectDaySorted);
  

}

// getallroutine(){
//  this.http.post((this.url+'/newClass/class_get_all'),{})
//  .subscribe((routine)=>{
//    console.log(routine.json());
//    this.allroutine = routine.json();
//    this.routineList = _.pluck(this.allroutine,'name');
//  });
// }
  
  // openMyModal(event) {
  //   document.querySelector('#' + event).classList.add('md-show');
  // }
  
  // closeMyModal(event) {
  //   console.log(event);
  //   ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  // }

  // initializeForm(){
  //  this.routineForm = new FormGroup({
  // 		"day": new FormControl(this.day,Validators.required),
  //     "start_time": new FormControl(this.start_time,Validators.required),
  //     "end_time": new FormControl(this.end_time,Validators.required),
  //     "subject_ref":new FormControl(this.subject_ref,Validators.required),
  //     "teacher_ref": new FormControl(this.teacher_ref,Validators.required),
  // 		"session": new FormControl(this.session,Validators.required)
  //  });
  // }
  
  // putRoutine(value){
  // 	 console.log(value);
 
  // 	// let class_ref:any = _.where(this.getClassAll,{name:value.class,section:value.section})[0];
  //   this.http.post((this.url+'/routine/routine'),{
  //   	"day": value.day,
  //     "start_time": value.start_time,
  //     "end_time": value.end_time,
  //     "subject_ref": _.where(this.getSubjectAll,{name:value.subject_ref})[0]['_id'],
  //     "class_ref": this.class_ref,
  //     "teacher_ref": (_.where(this.getTeacherAll,{erp_id:value.teacher_ref,session:this.session})[0])['_id'],
  //     "session":this.session,
  //     "access_token": this.cookie


  //   }).subscribe((routine:any)=>{
  //       //this.getallroutine();
  //          // this.getStaffMethod(value.type);
  //          console.log("routine aaya hai save hoke:",routine.json());
  //           this.getSectionMethod(this.selectSection);  	   
  //       });    
  // }

  // putEditedRoutine(value:any){
  //   console.log(value);

  //   this.http.post((this.url+ '/routine/routine_edit'),{
  //     "_id": this.id,
  //     "day": value.day,
  //     "start_time": value.start_time,
  //     "end_time": value.end_time,
  //     "subject_ref": _.where(this.getSubjectAll,{name:value.subject_ref})[0]['_id'],
  //     "class_ref": this.class_ref,
  //     "teacher_ref": (_.where(this.getTeacherAll,{erp_id:value.teacher_ref,session:this.session})[0])['_id'],
  //     "session":this.session,
  //     "access_token": this.cookie

  //   }).subscribe((editedroutine)=>{
  //     console.log(editedroutine.json());
  //     console.log("Lo ji lo aa gya edited routine edit hoke...")
  //        this.getSectionMethod(this.selectSection);
  //     //this.getallroutine();

  //   });
  // }




  // addRoutine(){
  // 	  this.editMode = false;     
  // 	  this.day = '';
  //     this.id = '';
  //     this.start_time = '';
  //     this.end_time = '';
  //     this.teacher_ref = '';
  // 		this.subject_ref = '';
  //     this.initializeForm();
  //     console.log(this.routineForm);
  //     this.openMyModal('effect-13');

    

  // }

  // editRoutine(index){
  //    this.editMode = true;
  //    this.id = (this.allroutine[index])._id;
  // 	 this.day = (this.allroutine[index]).day;
  //    //this.teacher
  //    this.start_time = (this.allroutine[index]).start_time;
  //    this.end_time = (this.allroutine[index]).end_time;
  //    //this.teacher_ = +(this.allroutine[index]).fare;
  //       this.initializeForm();
  //       console.log(this.routineForm);
  //       this.openMyModal('effect-13');
  // }
}
