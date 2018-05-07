import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FroalaEditComponent} from './froala-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FroalaEditComponent,
    data: {
      breadcrumb: 'Froala WYSIWYG Editor',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FroalaEditRoutingModule { }
