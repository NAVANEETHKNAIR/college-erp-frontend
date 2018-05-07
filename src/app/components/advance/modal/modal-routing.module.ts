import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModalComponent} from './modal.component';

const routes: Routes = [
  {
    path: '',
    component: ModalComponent,
    data: {
      breadcrumb: 'Modal',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRoutingModule { }
