import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccordionComponent} from './accordion.component';

const routes: Routes = [
  {
    path: '',
    component: AccordionComponent,
    data: {
      breadcrumb: 'Accordion',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccordionRoutingModule { }
