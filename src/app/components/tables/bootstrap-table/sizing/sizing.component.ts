import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import * as _ from 'underscore'
@Component({
  selector: 'app-sizing',
  templateUrl: './sizing.component.html',
  styleUrls: ['./sizing.component.scss']
})
export class SizingComponent implements OnInit {
public getClassAll:any;
public selectClass:any;
public selectSection:any;
public studentList:any;
public result: any;
public filterClass:any;
public getSectionOfClass:any;
public url: 'http://localhosthost:3000';
  modelPopup: NgbDateStruct;


  constructor(public parserFormatter: NgbDateParserFormatter,public http: Http) { }

  ngOnInit() {
  this.http.post(this.url + '/newClass/get_class_all',{})
      .subscribe((data) => {
        console.log(data.json());
        this.getClassAll = data.json();
        //let classArray:any
        this.filterClass= _.uniq(_.pluck(this.getClassAll,'name')); 
          

        console.log("filterCLass:",this.filterClass);
      });
  }

  getSectionMethod(value){
    console.log(value);
   this.selectSection = value;
    console.log(this.selectClass);
    console.log('select section:',this.selectSection);
    this.result = _.where(this.getClassAll,{name: this.selectClass, section: value})[0];
    console.log(this.result._id);
    this.http.post(this.url + '/student/students_get_for_class_ref',{class_ref:this.result._id})
        .subscribe((data)=>{
          console.log(data.json());
          this.studentList = data.json();
            //this.rowsOnPage = this.studentList.length();
        })
  }

  getClassMethod(value){
    console.log(value);
    this.selectClass = value;
    this.getSectionOfClass = _.where(this.getClassAll,{name:this.selectClass});
    console.log("getSectionOfClass:",this.getSectionOfClass);
  }

  selectToday() {

  	let now = new Date();
    
    this.modelPopup = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
 
  selectValue(value){
    
     console.log(value);
  }

}
