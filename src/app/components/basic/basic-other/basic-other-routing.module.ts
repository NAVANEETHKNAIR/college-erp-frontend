import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasicOtherComponent} from './basic-other.component';

const routes: Routes = [
  {
    path: '',
    component: BasicOtherComponent,
    data: {
      breadcrumb: 'Other',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicOtherRoutingModule { }
