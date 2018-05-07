import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';
import {CellComponent} from './cell/cell.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {MultiRowsComponent} from './multi-rows/multi-rows.component';
import {SingleRowComponent} from './single-row/single-row.component';
import {SharedModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SelectionRoutingModule,
    SharedModule
  ],
  declarations: [SelectionComponent, CellComponent, CheckboxComponent, MultiRowsComponent, SingleRowComponent]
})
export class SelectionModule { }
