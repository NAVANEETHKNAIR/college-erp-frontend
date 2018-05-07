import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskingRoutingModule } from './masking-routing.module';
import { MaskingComponent } from './masking.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaskingRoutingModule,
    SharedModule
  ],
  declarations: [MaskingComponent]
})
export class MaskingModule { }
