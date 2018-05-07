import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'E-Email',
      status: false
    },
    children: [
      {
        path: 'compose-email',
        loadChildren: './email-compose/email-compose.module#EmailComposeModule'
      },
      {
        path: 'email-inbox',
        loadChildren: './email-inbox/email-inbox.module#EmailInboxModule'
      },
      {
        path: 'email-read',
        loadChildren: './email-read/email-read.module#EmailReadModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
