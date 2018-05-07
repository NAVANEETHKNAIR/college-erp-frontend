import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailInboxComponent} from './email-inbox.component';

const routes: Routes = [
  {
    path: '',
    component: EmailInboxComponent,
    data: {
      breadcrumb: 'Email Inbox',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailInboxRoutingModule { }
