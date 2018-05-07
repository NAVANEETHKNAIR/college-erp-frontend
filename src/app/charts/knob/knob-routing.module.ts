import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KnobComponent} from './knob.component';

const routes: Routes = [
  {
    path: '',
    component: KnobComponent,
    data: {
      breadcrumb: 'Knob Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnobRoutingModule { }
