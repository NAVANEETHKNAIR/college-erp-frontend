import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PeityComponent} from './peity.component';

const routes: Routes = [
  {
    path: '',
    component: PeityComponent,
    data: {
      breadcrumb: 'Peity Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeityRoutingModule { }
