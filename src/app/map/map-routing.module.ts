import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Map',
      status: false
    },
    children: [
      {
        path: 'google',
        loadChildren: './google-map/google-map.module#GoogleMapModule'
      }, {
        path: 'vector',
        loadChildren: './vector/vector.module#VectorModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
