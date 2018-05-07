import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Data Tables',
      status: false
    },
    children: [
      {
        path: 'basic-datatable',
        loadChildren: './basic-datatable/basic-datatable.module#BasicDatatableModule'
      }, {
        path: 'editable',
        loadChildren: './inline-edit/inline-edit.module#InlineEditModule'
      }, {
        path: 'row-details',
        loadChildren: './child-row/child-row.module#ChildRowModule'
      }, {
        path: 'paging',
        loadChildren: './paging/paging.module#PagingModule'
      }, {
        path: 'selection',
        loadChildren: './selection/selection.module#SelectionModule'
      }, {
        path: 'other',
        loadChildren: './other-datatable/other-datatable.module#OtherDatatableModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableRoutingModule { }
