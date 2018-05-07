import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildRowRoutingModule } from './child-row-routing.module';
import { ChildRowComponent } from './child-row.component';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChildRowRoutingModule,
    SharedModule
  ],
  declarations: [ChildRowComponent]
})
export class ChildRowModule { }
