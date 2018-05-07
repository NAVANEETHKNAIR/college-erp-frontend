import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Task',
      status: false
    },
    children: [
      {
        path: 'list',
        loadChildren: './list/list.module#ListModule'
      }, {
        path: 'board',
        loadChildren: './board/board.module#BoardModule'
      }, {
        path: 'details',
        loadChildren: './details/details.module#DetailsModule'
      }, {
        path: 'issue',
        loadChildren: './issue/issue.module#IssueModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
