import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuillEditComponent} from './quill-edit.component';

const routes: Routes = [
  {
    path: '',
    component: QuillEditComponent,
    data: {
      breadcrumb: 'Quill Editor',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuillEditRoutingModule { }
