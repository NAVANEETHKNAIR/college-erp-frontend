import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MaskingComponent} from './masking.component';

const routes: Routes = [
  {
    path: '',
    component: MaskingComponent,
    data: {
      breadcrumb: 'Form Masking'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaskingRoutingModule { }
