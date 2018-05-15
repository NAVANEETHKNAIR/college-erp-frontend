import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layouts/admin/admin.component';
import {AuthComponent} from './layouts/auth/auth.component';
import { StudentComponent } from './student/student.component';
import { StaffComponent } from './staff/staff.component';
import { ClassComponent } from './class/class.component';
import { SubjectComponent } from './subject/subject.component';
import { TransportComponent } from './transport/transport.component';
import { DormitoryComponent } from './dormitory/dormitory.component';
import { RoutineComponent } from './routine/routine.component';
import { LibraryComponent } from './library/library.component';
import { AttendanceStudentComponent } from './attendance-student/attendance-student.component';
import { AttendanceStaffComponent } from './attendance-staff/attendance-staff.component';
import { ExamComponent } from './exam/exam.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayslipComponent } from './payslip/payslip.component';
import { MessageComponent } from './message/message.component';
import { SystemComponent } from './system/system.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }, {
        path: 'widget',
        loadChildren: './widget/widget.module#WidgetModule'
      }, {
        path: 'basic',
        loadChildren: './components/basic/basic.module#BasicModule'
      }, {
        path: 'advance',
        loadChildren: './components/advance/advance.module#AdvanceModule'
      }, {
        path: 'animations',
        loadChildren: './animations/animations.module#AnimationsModule'
      }, {
        path: 'forms',
        loadChildren: './components/forms/forms.module#FormsModule'
      }, {
        path: 'bootstrap-table',
        loadChildren: './components/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
      }, {
        path: 'data-table',
        loadChildren: './components/tables/data-table/data-table.module#DataTableModule',
      }, {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule',
      }, {
        path: 'map',
        loadChildren: './map/map.module#MapModule',
      }, {
        path: 'maintenance/error',
        loadChildren: './maintenance/error/error.module#ErrorModule'
      }, {
        path: 'maintenance/coming-soon',
        loadChildren: './maintenance/coming-soon/coming-soon.module#ComingSoonModule'
      }, {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
      }, {
        path: 'email',
        loadChildren: './email/email.module#EmailModule'
      }, {
        path: 'crm-contact',
        loadChildren: './components/crm-contact/crm-contact.module#CrmContactModule'
      }, {
        path: 'task',
        loadChildren: './components/task/task.module#TaskModule'
      }, {
        path: 'editor',
        loadChildren: './components/editor/editor.module#EditorModule'
      }, {
        path: 'invoice',
        loadChildren: './components/invoice/invoice.module#InvoiceModule'
      }, {
        path: 'file-upload',
        loadChildren: './components/file-upload-ui/file-upload-ui.module#FileUploadUiModule'
      }, {
        path: 'change-log',
        loadChildren: './change-log/change-log.module#ChangeLogModule'
      }, {
        path: 'simple-page',
        loadChildren: './simple-page/simple-page.module#SimplePageModule'
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      }, {
        path: 'maintenance/offline-ui',
        loadChildren: './maintenance/offline-ui/offline-ui.module#OfflineUiModule'
      }
    ]
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'staff',
    component: StaffComponent
  },
  {
    path: 'class',
    component: ClassComponent
  },
  {
    path: 'subject',
    component: SubjectComponent
  },
  {
    path: 'transport',
    component: TransportComponent
  },
  {
    path: 'dormitory',
    component: DormitoryComponent
  },
  {
    path: 'routine',
    component: RoutineComponent
  },
  {
    path: 'library',
    component: LibraryComponent

  },
  {
    path: 'attendance-student',
    component: AttendanceStudentComponent

  },
  {
    path: 'attendance-staff',
    component: AttendanceStaffComponent
  },
  {
    path: 'exam',
    component: ExamComponent
  },
  {
    path: 'payroll',
    component: PayrollComponent,
    children:[{
     path:'payslip',
     component: PayslipComponent
     }]
  },
  {
    path:'message',
    component: MessageComponent
  },
  {
    path:'system',
    component: SystemComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
