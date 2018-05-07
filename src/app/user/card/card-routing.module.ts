import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CardComponent} from './card.component';

const routes: Routes = [
  {
    path: '',
    component: CardComponent,
    data: {
      breadcrumb: 'User Card',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
