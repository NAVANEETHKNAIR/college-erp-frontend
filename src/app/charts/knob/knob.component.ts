import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KnobComponent implements OnInit {
  options = {
    size: 300
  };

  constructor() { }

  ngOnInit() {
  }

}
