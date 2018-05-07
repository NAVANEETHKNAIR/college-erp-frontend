import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyRoutingModule } from './notify-routing.module';
import { NotifyComponent } from './notify.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NotifyRoutingModule,
    SharedModule
  ],
  declarations: [NotifyComponent]
})
export class NotifyModule { }
