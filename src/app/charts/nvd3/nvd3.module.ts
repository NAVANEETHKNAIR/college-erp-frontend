import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Nvd3RoutingModule } from './nvd3-routing.module';
import { Nvd3Component } from './nvd3.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    Nvd3RoutingModule,
    SharedModule
  ],
  declarations: [Nvd3Component]
})
export class Nvd3Module { }
