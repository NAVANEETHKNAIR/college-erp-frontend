import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailReadComponent} from './email-read.component';

const routes: Routes = [
  {
    path: '',
    component: EmailReadComponent,
    data: {
      breadcrumb: 'Email Read',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailReadRoutingModule { }
