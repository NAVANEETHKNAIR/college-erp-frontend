import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickerRoutingModule } from './picker-routing.module';
import { PickerComponent } from './picker.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PickerRoutingModule,
    SharedModule
  ],
  declarations: [PickerComponent]
})
export class PickerModule { }
