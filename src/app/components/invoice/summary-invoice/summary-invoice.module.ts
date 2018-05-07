import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryInvoiceRoutingModule } from './summary-invoice-routing.module';
import { SummaryInvoiceComponent } from './summary-invoice.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SummaryInvoiceRoutingModule,
    SharedModule
  ],
  declarations: [SummaryInvoiceComponent]
})
export class SummaryInvoiceModule { }
