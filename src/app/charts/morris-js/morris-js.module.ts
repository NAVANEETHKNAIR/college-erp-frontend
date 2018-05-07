import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MorrisJsRoutingModule } from './morris-js-routing.module';
import { MorrisJsComponent } from './morris-js.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MorrisJsRoutingModule,
    SharedModule
  ],
  declarations: [MorrisJsComponent]
})
export class MorrisJsModule { }
