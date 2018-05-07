import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddOnComponent} from './add-on.component';

const routes: Routes = [
  {
    path: '',
    component: AddOnComponent,
    data: {
      breadcrumb: 'Form Elements Add-On',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddOnRoutingModule { }
