import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdvanceElementsComponent} from './advance-elements.component';

const routes: Routes = [
  {
    path: '',
    component: AdvanceElementsComponent,
    data: {
      breadcrumb: 'Form Elements Advance',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceElementsRoutingModule { }
