import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListChartComponent} from './list-chart.component';

const routes: Routes = [
  {
    path: '',
    component: ListChartComponent,
    data: {
      breadcrumb: 'List Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListChartRoutingModule { }
