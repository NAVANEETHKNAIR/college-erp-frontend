import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnimationsComponent} from './animations.component';

const routes: Routes = [{
  path: '',
  component: AnimationsComponent,
  data: {
    heading: 'Animations',
    breadcrumb: 'Animations'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimationsRoutingModule { }
