import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PickerComponent} from './picker.component';

const routes: Routes = [
  {
    path: '',
    component: PickerComponent,
    data: {
      breadcrumb: 'Form Picker'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickerRoutingModule { }
