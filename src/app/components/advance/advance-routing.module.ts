import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Advance Components',
      status: false
    },
    children: [
      {
        path: 'modal',
        loadChildren: './modal/modal.module#ModalModule'
      }, {
        path: 'notifications',
        loadChildren: './notifications/notifications.module#NotificationsModule'
      }, {
        path: 'notify',
        loadChildren: './notify/notify.module#NotifyModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceRoutingModule { }
