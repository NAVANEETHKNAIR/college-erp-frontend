import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './error.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    data: {
      breadcrumb: 'Error Pages'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
