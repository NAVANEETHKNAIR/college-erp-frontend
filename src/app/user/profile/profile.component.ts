import { Component, OnInit } from '@angular/core';

import {Http} from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editPassword = true;

  constructor(public http: Http) {

  }

  ngOnInit() {

  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }


}
