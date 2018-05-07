import { Component, OnInit } from '@angular/core';
import {fadeInOutTranslate} from '../../../shared/elements/animation';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  animations: [fadeInOutTranslate]
})
export class TabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
