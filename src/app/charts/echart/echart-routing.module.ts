import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EchartComponent} from './echart.component';

const routes: Routes = [
  {
    path: '',
    component: EchartComponent,
    data: {
      breadcrumb: 'E-Chart Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EchartRoutingModule { }
