import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GenericClassComponent} from './generic-class.component';

const routes: Routes = [
  {
    path: '',
    component: GenericClassComponent,
    data: {
      breadcrumb: 'Generic Class',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericClassRoutingModule { }
