
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
import { LoginGuardService,RolesGuardAuthorizeGuardService} from './guards/admin-guard.service';
import { ErrorComponent } from './error/error.component';
import { StudentdashboardComponent } from './student-dashboard/student-dashboard.component';
import { AttendanceStudentRecordComponent } from './attendance-student-record/attendance-student-record.component';
import { AttendanceStaffRecordComponent } from './attendance-staff-record/attendance-staff-record.component';
import { FeesComponent } from './fees/fees.component';
import { FeesReportComponent } from './fees-report/fees-report.component';
import { PayslipReportStaffComponent } from './payslip-report-staff/payslip-report-staff.component';
import { PayslipReportComponent } from './payslip-report/payslip-report.component';
import { FeesReportStudentComponent } from './fees-report-student/fees-report-student.component';
import { MarksComponent } from './marks/marks.component';
import { ExpenseComponent } from './expense/expense.component';
import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamReportComponent } from './exam-report/exam-report.component';
import { MarksReportComponent } from './marks-report/marks-report.component';
import { LibraryReportComponent } from './library-report/library-report.component';
import { RoutineReportComponent } from './routine-report/routine-report.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';


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
    AttendanceStudentRecordComponent,
    AttendanceStaffRecordComponent,
    FeesComponent,
    FeesReportComponent,
    PayslipReportComponent,
    MarksComponent,
    ExpenseComponent,
    SideMenuComponent,
    ProfileComponent,
    PayslipReportStaffComponent,
    FeesReportStudentComponent,
    ExamReportComponent,
    MarksReportComponent,
    LibraryReportComponent,
    RoutineReportComponent,
    SuperAdminComponent
    
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
               RolesGuardAuthorizeGuardService 
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
