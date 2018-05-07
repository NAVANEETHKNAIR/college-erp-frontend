import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MorrisJsComponent} from './morris-js.component';

const routes: Routes = [
  {
    path: '',
    component: MorrisJsComponent,
    data: {
      breadcrumb: 'MorrisJS Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorrisJsRoutingModule { }
