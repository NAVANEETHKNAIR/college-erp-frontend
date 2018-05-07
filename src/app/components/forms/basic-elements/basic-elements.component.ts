import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})

export class BasicElementsComponent implements OnInit {
  
  enableClickatell=false;
  enableTwilio = true;
  constructor(private pNotify:NotificationsService) { }

  ngOnInit() {

  }

  toggleTwilio(event) {
  	if (event == true) {
  		this.enableTwilio = false;
  		this.pNotify.success('Clickatell Enabled','Check your Clickatell credentials');
  	}

  }

  toggleClickatell(event) {
  	if (event == true) {
  		this.enableClickatell = false;
  		this.pNotify.success('Twilio Enabled','Check your Twilio credentials');
  	}

  }


}
