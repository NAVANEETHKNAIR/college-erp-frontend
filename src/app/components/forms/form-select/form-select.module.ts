import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSelectRoutingModule } from './form-select-routing.module';
import { FormSelectComponent } from './form-select.component';
import {SharedModule} from '../../../shared/shared.module';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormSelectRoutingModule,
    SharedModule,
    HttpModule
  ],
  declarations: [FormSelectComponent]
})
export class FormSelectModule { }
