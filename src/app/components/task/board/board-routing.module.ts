import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoardComponent} from './board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    data: {
      breadcrumb: 'Task Board',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
