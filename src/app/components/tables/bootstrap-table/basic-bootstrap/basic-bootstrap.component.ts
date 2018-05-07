import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-bootstrap',
  templateUrl: './basic-bootstrap.component.html',
  styleUrls: ['./basic-bootstrap.component.scss']
})
export class BasicBootstrapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openMyModal(event) {
  	console.log(event);
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
