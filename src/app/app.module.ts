
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { SystemService } from './system/service.system';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService,
         AdminAuthorizeGuardService,
         StudentAuthorizeGuardService,
         LibrarianAuthorizeGuardService,
         TeacherAuthorizeGuardService,
         AccountantGuardService,
         OtherAuthorizeGuardService
        } from './guards/admin-guard.service';
import { ErrorComponent } from './error/error.component';
import { StudentdashboardComponent } from './student-dashboard/student-dashboard.component';
import { AttendanceRecordComponent } from './attendance-record/attendance-record.component';
import { FeesComponent } from './fees/fees.component';
import { FeesReportComponent } from './fees-report/fees-report.component';
import { PayslipReportComponent } from './payslip-report/payslip-report.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TitleComponent,
    BreadcrumbsComponent,
    AuthComponent,
    StudentComponent,
    StaffComponent,
    ClassComponent,
    SubjectComponent,
    TransportComponent,
    DormitoryComponent,
    RoutineComponent,
    LibraryComponent,
    AttendanceStudentComponent,
    AttendanceStaffComponent,
    ExamComponent,
    PayrollComponent,
    PayslipComponent,
    MessageComponent,
    SystemComponent,
    CalendarComponent,
    LoginComponent,
    ErrorComponent,
    StudentdashboardComponent,
    AttendanceRecordComponent,
    FeesComponent,
    FeesReportComponent,
    PayslipReportComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpModule
  ],
  providers: [ 
               SystemService, 
               LoginGuardService,
               AdminAuthorizeGuardService,
               StudentAuthorizeGuardService,
               LibrarianAuthorizeGuardService,
               TeacherAuthorizeGuardService,
               AccountantGuardService,
               OtherAuthorizeGuardService 
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
