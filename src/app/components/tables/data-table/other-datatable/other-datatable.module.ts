import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherDatatableRoutingModule } from './other-datatable-routing.module';
import { OtherDatatableComponent } from './other-datatable.component';
import {HttpModule} from '@angular/http';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OtherDatatableRoutingModule,
    SharedModule,
    HttpModule
  ],
  declarations: [OtherDatatableComponent]
})
export class OtherDatatableModule { }
