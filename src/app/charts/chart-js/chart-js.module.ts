import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartJsRoutingModule } from './chart-js-routing.module';
import { ChartJsComponent } from './chart-js.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChartJsRoutingModule,
    SharedModule
  ],
  declarations: [ChartJsComponent]
})
export class ChartJsModule { }
