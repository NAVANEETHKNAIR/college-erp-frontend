import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent } from './issue.component';
import {SharedModule} from '../../../shared/shared.module';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    IssueRoutingModule,
    SharedModule,
    HttpModule
  ],
  declarations: [IssueComponent]
})
export class IssueModule { }
