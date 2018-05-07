import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuillEditRoutingModule } from './quill-edit-routing.module';
import { QuillEditComponent } from './quill-edit.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    QuillEditRoutingModule,
    SharedModule
  ],
  declarations: [QuillEditComponent]
})
export class QuillEditModule { }
