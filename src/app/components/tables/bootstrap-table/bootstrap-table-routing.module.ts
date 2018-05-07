import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Bootstrap Tables',
      status: false
    },
    children: [
      {
        path: 'basic-bootstrap',
        loadChildren: './basic-bootstrap/basic-bootstrap.module#BasicBootstrapModule'
      }, {
        path: 'sizing',
        loadChildren: './sizing/sizing.module#SizingModule'
      }, {
        path: 'border',
        loadChildren: './border/border.module#BorderModule'
      }, {
        path: 'styling',
        loadChildren: './styling/styling.module#StylingModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootstrapTableRoutingModule { }
