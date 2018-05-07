import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Invoice',
      status: false
    },
    children: [
      {
        path: 'basic-invoice',
        loadChildren: './basic-invoice/basic-invoice.module#BasicInvoiceModule'
      }, {
        path: 'summary',
        loadChildren: './summary-invoice/summary-invoice.module#SummaryInvoiceModule'
      }, {
        path: 'list',
        loadChildren: './list-invoice/list-invoice.module#ListInvoiceModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
