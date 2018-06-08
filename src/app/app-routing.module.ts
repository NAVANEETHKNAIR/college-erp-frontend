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
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { StudentdashboardComponent } from './student-dashboard/student-dashboard.component';
import { AttendanceRecordComponent } from './attendance-record/attendance-record.component';
import { FeesComponent } from './fees/fees.component';
import { FeesReportComponent } from './fees-report/fees-report.component';

import { 
         LoginGuardService,
         AdminAuthorizeGuardService,
         StudentAuthorizeGuardService,
         LibrarianAuthorizeGuardService,
         TeacherAuthorizeGuardService,
         AccountantGuardService,
         OtherAuthorizeGuardService
       } from './guards/admin-guard.service';
import { ErrorComponent } from './error/error.component'
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',


        
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
      }, 
      {
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
    component: StudentComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'class',
    component: ClassComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'subject',
    component: SubjectComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'transport',
    component: TransportComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'dormitory',
    component: DormitoryComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'routine',
    component: RoutineComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService || LibrarianAuthorizeGuardService]

  },
  {
    path: 'attendance-student',
    component: AttendanceStudentComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]

  },
  {
    path: 'attendance-staff',
    component: AttendanceStaffComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'exam',
    component: ExamComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'payroll',
    component: PayrollComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService],
    children:[{
     path:'payslip',
     component: PayslipComponent
     }]
  },
  {
    path:'message',
    component: MessageComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path:'system',
    component: SystemComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
   path:'login',
   component: LoginComponent,

  },
  {
  path: 'student-dashboard',
  component: StudentdashboardComponent,
  canActivate: [
         LoginGuardService,
         StudentAuthorizeGuardService ||
         LibrarianAuthorizeGuardService ||
         TeacherAuthorizeGuardService ||
         AccountantGuardService ||
         OtherAuthorizeGuardService
       ]
  
  },
  {
   path: 'attendance-record',
   component: AttendanceRecordComponent,
   canActivate: [LoginGuardService, StudentAuthorizeGuardService]
  },
  {
   path: 'fees',
   component: FeesComponent,
   canActivate: [LoginGuardService, AdminAuthorizeGuardService]
  },
  {
   path: 'fees-report',
   component: FeesReportComponent,
   canActivate: [LoginGuardService, AdminAuthorizeGuardService]
  },
  {
    path:'404',
    component: ErrorComponent
  },

  {
    path: '**',
    component: ErrorComponent

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
