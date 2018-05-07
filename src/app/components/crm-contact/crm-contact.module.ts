import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmContactRoutingModule } from './crm-contact-routing.module';
import { CrmContactComponent } from './crm-contact.component';
import {SharedModule} from '../../shared/shared.module';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    CrmContactRoutingModule,
    SharedModule,
    HttpModule
  ],
  declarations: [CrmContactComponent]
})
export class CrmContactModule { }
