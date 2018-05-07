import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadUiRoutingModule } from './file-upload-ui-routing.module';
import { FileUploadUiComponent } from './file-upload-ui.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FileUploadUiRoutingModule,
    SharedModule
  ],
  declarations: [FileUploadUiComponent]
})
export class FileUploadUiModule { }
