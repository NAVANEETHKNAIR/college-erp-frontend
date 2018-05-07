import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IssueComponent} from './issue.component';

const routes: Routes = [
  {
    path: '',
    component: IssueComponent,
    data: {
      breadcrumb: 'Task Issue',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueRoutingModule { }
