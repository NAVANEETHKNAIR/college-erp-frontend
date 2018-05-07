import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailInboxRoutingModule } from './email-inbox-routing.module';
import { EmailInboxComponent } from './email-inbox.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EmailInboxRoutingModule,
    SharedModule
  ],
  declarations: [EmailInboxComponent]
})
export class EmailInboxModule { }
