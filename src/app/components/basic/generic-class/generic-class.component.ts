import { Component, OnInit } from '@angular/core';
import {fadeInOutTranslate} from '../../../shared/elements/animation';

@Component({
  selector: 'app-generic-class',
  templateUrl: './generic-class.component.html',
  styleUrls: ['./generic-class.component.scss'],
  animations: [fadeInOutTranslate]
})
export class GenericClassComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
