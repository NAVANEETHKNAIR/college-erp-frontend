import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDatatableRoutingModule } from './basic-datatable-routing.module';
import { BasicDatatableComponent } from './basic-datatable.component';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BasicDatatableRoutingModule,
    SharedModule
  ],
  declarations: [BasicDatatableComponent]
})
export class BasicDatatableModule { }
