import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BreadcrumbComponent} from './breadcrumb.component';

const routes: Routes = [
  {
    path: '',
    component: BreadcrumbComponent,
    data: {
      breadcrumb: 'Breadcrumb Style',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreadcrumbRoutingModule { }
