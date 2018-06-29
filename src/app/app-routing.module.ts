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
import { ExamReportComponent } from './exam-report/exam-report.component';
import { MarksReportComponent } from './marks-report/marks-report.component';
import { LibraryReportComponent } from './library-report/library-report.component';
import { RoutineReportComponent } from './routine-report/routine-report.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';



import { 
         LoginGuardService,
         RolesGuardAuthorizeGuardService  
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
    canActivate:[LoginGuardService],
    canActivateChild:[LoginGuardService],
    
    children:[
  {
    path: '',
    redirectTo: 'student-dashboard',
    pathMatch: 'full',  
  }, 

  {
    path: 'student',
    component: StudentComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'class',
    component: ClassComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'subject',
    component: SubjectComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'transport',
    component: TransportComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'dormitory',
    component: DormitoryComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'routine',
    component: RoutineComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN','LIBRARIAN']}

  },
  {
    path: 'attendance-student',
    component: AttendanceStudentComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}

  },
  {
    path: 'attendance-staff',
    component: AttendanceStaffComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'exam',
    component: ExamComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'exam-report',
    component: ExamReportComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['STUDENT']}
  },
  {
    path: 'payroll',
    component: PayrollComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path:'message',
    component: MessageComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path:'system',
    component: SystemComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
  path: 'student-dashboard',
  component: StudentdashboardComponent,
  canActivate: [RolesGuardAuthorizeGuardService],
  data:{roles:['ADMIN','STUDENT','LIBRARIAN','TEACHER','ACCOUNTANT','OTHER']}
  
  },
  {
   path: 'attendance-student-record',
   component: AttendanceStudentRecordComponent,
   canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['STUDENT']}
  },
   {
   path: 'attendance-staff-record',
   component: AttendanceStudentRecordComponent,
   canActivate: [RolesGuardAuthorizeGuardService],
   data:{roles:['TEACHER','ACCOUNTANT','LIBRARIAN','OTHER']}
  },
  {
   path: 'fees',
   component: FeesComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
   path: 'fees-report',
   component: FeesReportComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
   path: 'fees-report-student',
   component: FeesReportStudentComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['STUDENT']}
  },
  {
   path: 'marks',
   component: MarksComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
   path: 'marks-report',
   component: MarksReportComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['STUDENT']}   
  },
  {
   path: 'library-report',
   component: LibraryReportComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['STUDENT']}   
  },
  {
   path: 'routine-report',
   component: RoutineReportComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['STUDENT']}   
  },
  {
   path: 'expense',
   component: ExpenseComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
   path: 'payslip-report',
   component: PayslipReportComponent,
   canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN']}
  },
  {
   path: 'payslip-report-staff',
   component: PayslipReportStaffComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['LIBRARIAN','ACCOUNTANT','TEACHER','OTHER']}
  },
  {
   path: 'profile',
   component: ProfileComponent,
    canActivate: [RolesGuardAuthorizeGuardService],
    data:{roles:['ADMIN','LIBRARIAN','ACCOUNTANT','TEACHER','OTHER','STUDENT']}   
  }
  ]

  },
  {
   path:'create-admin',
   component: SuperAdminComponent,
   canActivate: [LoginGuardService,RolesGuardAuthorizeGuardService],
   data:{roles:['SUPERADMIN']}   

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

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
