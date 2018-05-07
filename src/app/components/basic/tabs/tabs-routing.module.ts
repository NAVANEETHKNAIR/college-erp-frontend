import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TabsComponent} from './tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    data: {
      breadcrumb: 'Tabs',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
