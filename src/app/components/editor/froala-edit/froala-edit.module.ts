import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FroalaEditRoutingModule } from './froala-edit-routing.module';
import { FroalaEditComponent } from './froala-edit.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FroalaEditRoutingModule,
    SharedModule
  ],
  declarations: [FroalaEditComponent]
})
export class FroalaEditModule { }
