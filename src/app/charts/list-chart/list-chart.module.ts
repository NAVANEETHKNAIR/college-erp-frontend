import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListChartRoutingModule } from './list-chart-routing.module';
import { ListChartComponent } from './list-chart.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ListChartRoutingModule,
    SharedModule
  ],
  declarations: [ListChartComponent]
})
export class ListChartModule { }
