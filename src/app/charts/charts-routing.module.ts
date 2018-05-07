import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Chart',
      status: false
    },
    children: [
      {
        path: 'google',
        loadChildren: './google/google.module#GoogleModule'
      }, {
        path: 'echart',
        loadChildren: './echart/echart.module#EchartModule'
      }, {
        path: 'chart-js',
        loadChildren: './chart-js/chart-js.module#ChartJsModule'
      }, {
        path: 'knob',
        loadChildren: './knob/knob.module#KnobModule'
      }, {
        path: 'list-chart',
        loadChildren: './list-chart/list-chart.module#ListChartModule'
      }, {
        path: 'morris-js',
        loadChildren: './morris-js/morris-js.module#MorrisJsModule'
      }, {
        path: 'nvd3',
        loadChildren: './nvd3/nvd3.module#Nvd3Module'
      }, {
        path: 'peity',
        loadChildren: './peity/peity.module#PeityModule'
      }, {
        path: 'radial',
        loadChildren: './radial/radial.module#RadialModule'
      }, {
        path: 'sparklines',
        loadChildren: './sparklines/sparklines.module#SparklinesModule'
      }, {
        path: 'c3-js',
        loadChildren: './c3-js/c3-js.module#C3JsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
