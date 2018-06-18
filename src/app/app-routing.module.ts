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
import { PayrollComponent } from './payrollCopy/payroll.component';
import { PayslipComponent } from './payslip/payslip.component';
import { MessageComponent } from './message/message.component';
import { SystemComponent } from './system/system.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { StudentdashboardComponent } from './student-dashboard/student-dashboard.component';
import { AttendanceStudentRecordComponent } from './attendance-student-record/attendance-student-record.component';
import { AttendanceStaffRecordComponent } from './attendance-staff-record/attendance-staff-record.component';
import { FeesComponent } from './fees/fees.component';
import { FeesReportComponent } from './fees-report/fees-report.component';
import { PayslipReportComponent } from './payslip-report/payslip-report.component';
import { MarksComponent } from './marks/marks.component';
import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { ProfileComponent } from './profile/profile.component';
import { PayslipReportStaffComponent } from './payslip-report-staff/payslip-report-staff.component';
import { FeesReportStudentComponent } from './fees-report-student/fees-report-student.component';

import { 
         LoginGuardService,
         AdminAuthorizeGuardService,
         StudentAuthorizeGuardService,
         LibrarianAuthorizeGuardService,
         TeacherAuthorizeGuardService,
         AccountantGuardService,
         OtherAuthorizeGuardService
       } from './guards/admin-guard.service';
import { ErrorComponent } from './error/error.component';
import { ExpenseComponent } from './expense/expense.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminComponent,
    
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'

      }, 
      {
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
    path: 'auth',
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
    path: '',
    component: SideMenuComponent,
    canActivate: [LoginGuardService],
    
    children:[
 {
    path: '',
    redirectTo: 'student-dashboard',
    pathMatch: 'full',
    canActivateChild: [LoginGuardService]


    
  }, 

  {
    path: 'student',
    component: StudentComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'class',
    component: ClassComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'subject',
    component: SubjectComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'transport',
    component: TransportComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'dormitory',
    component: DormitoryComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'routine',
    component: RoutineComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService || LibrarianAuthorizeGuardService]

  },
  {
    path: 'attendance-student',
    component: AttendanceStudentComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]

  },
  {
    path: 'attendance-staff',
    component: AttendanceStaffComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'exam',
    component: ExamComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'payroll',
    component: PayrollComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService],
  },
  {
    path:'message',
    component: MessageComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path:'system',
    component: SystemComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivateChild: [LoginGuardService,AdminAuthorizeGuardService]
  },
  {
  path: 'student-dashboard',
  component: StudentdashboardComponent,
  canActivateChild: [
         LoginGuardService,
         AdminAuthorizeGuardService ||
         StudentAuthorizeGuardService ||
         LibrarianAuthorizeGuardService ||
         TeacherAuthorizeGuardService ||
         AccountantGuardService ||
         OtherAuthorizeGuardService
       ]
  
  },
  {
   path: 'attendance-student-record',
   component: AttendanceStudentRecordComponent,
   canActivateChild: [LoginGuardService, StudentAuthorizeGuardService]
  },
   {
   path: 'attendance-staff-record',
   component: AttendanceStudentRecordComponent,
   canActivateChild: [LoginGuardService, StudentAuthorizeGuardService]
  },
  {
   path: 'fees',
   component: FeesComponent,
   canActivateChild: [LoginGuardService, AdminAuthorizeGuardService]
  },
  {
   path: 'fees-report',
   component: FeesReportComponent,
   canActivateChild: [LoginGuardService, AdminAuthorizeGuardService]
  },
    {
   path: 'fees-report-student',
   component: FeesReportStudentComponent,
   canActivateChild: [LoginGuardService, StudentAuthorizeGuardService]
  },
  {
   path: 'marks',
   component: MarksComponent,
   canActivateChild: [LoginGuardService, AdminAuthorizeGuardService]
  },
  {
   path: 'expense',
   component: ExpenseComponent,
   canActivateChild: [LoginGuardService, AdminAuthorizeGuardService]
  },
  {
   path: 'payslip-report',
   component: PayslipReportComponent,
   canActivateChild: [LoginGuardService, AdminAuthorizeGuardService] 
  },
    {
   path: 'payslip-report-staff',
   component: PayslipReportStaffComponent,
   canActivateChild: [LoginGuardService,
         LibrarianAuthorizeGuardService ||
         TeacherAuthorizeGuardService ||
         AccountantGuardService ||
         OtherAuthorizeGuardService] 
  },
  {
   path: 'profile',
   component: ProfileComponent,
   canActivateChild: [LoginGuardService] 
  },
  ]

  },
  {
   path:'login',
   component: LoginComponent,

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
