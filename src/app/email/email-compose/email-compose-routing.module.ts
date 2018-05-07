import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailComposeComponent} from './email-compose.component';

const routes: Routes = [
  {
    path: '',
    component: EmailComposeComponent,
    data: {
      breadcrumb: 'Compose Email',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailComposeRoutingModule { }
