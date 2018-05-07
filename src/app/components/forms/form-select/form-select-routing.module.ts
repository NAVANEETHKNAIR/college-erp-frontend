import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormSelectComponent} from './form-select.component';

const routes: Routes = [
  {
    path: '',
    component: FormSelectComponent,
    data: {
      breadcrumb: 'Form Select'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormSelectRoutingModule { }
