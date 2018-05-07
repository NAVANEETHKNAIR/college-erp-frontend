import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'User Profile',
      status: false
    },
    children: [
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
      }, {
        path: 'card',
        loadChildren: './card/card.module#CardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
