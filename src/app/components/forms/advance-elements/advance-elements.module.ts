import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvanceElementsRoutingModule } from './advance-elements-routing.module';
import { AdvanceElementsComponent } from './advance-elements.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdvanceElementsRoutingModule,
    SharedModule
  ],
  declarations: [AdvanceElementsComponent]
})
export class AdvanceElementsModule { }
