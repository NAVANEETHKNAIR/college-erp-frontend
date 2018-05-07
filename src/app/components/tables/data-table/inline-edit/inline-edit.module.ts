import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineEditRoutingModule } from './inline-edit-routing.module';
import { InlineEditComponent } from './inline-edit.component';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InlineEditRoutingModule,
    SharedModule
  ],
  declarations: [InlineEditComponent]
})
export class InlineEditModule { }
