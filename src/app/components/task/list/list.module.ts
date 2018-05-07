import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import {SharedModule} from '../../../shared/shared.module';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule,
    HttpModule
  ],
  declarations: [ListComponent]
})
export class ListModule { }
