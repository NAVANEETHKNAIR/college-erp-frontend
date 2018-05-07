import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Nvd3Component} from './nvd3.component';

const routes: Routes = [
  {
    path: '',
    component: Nvd3Component,
    data: {
      breadcrumb: 'NVD3 Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nvd3RoutingModule { }
