import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routesComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './services/register.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './services/user.service';
import { AuthGuardService } from '../security/auth-guard.service';
import { AppointmentService } from './services/appointment.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AuthService } from '../security/auth.service';
import { LoginService } from './services/login.service';
import { RezervePopupComponent } from './dashboard/schedule/rezerve-popup/rezerve-popup.component';
import { UsersComponent } from './dashboard/users/users.component';
import { UserComponent } from './dashboard/users/user/user.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';
import { AppointmentComponent } from './dashboard/appointments/appointment/appointment.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { ReportComponent } from './dashboard/reports/report/report.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCustomInterceptor } from './interceptor/http-custom-interceptor';
import { RegisterComponent } from './register/register.component';

const materialImports = [
  MatGridListModule,
  MatSelectModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatDividerModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatMenuModule,
  MatCardModule,
  ScrollingModule,
  MatTabsModule,
  MatProgressBarModule];

@NgModule({
  declarations: [
    AppComponent,
    routesComponents,
    RezervePopupComponent,
    UsersComponent,
    UserComponent,
    AppointmentsComponent,
    AppointmentComponent,
    HasRoleDirective,
    ReportsComponent,
    ReportComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    materialImports,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    RegisterService,
    CookieService,
    UserService,
    AuthGuardService,
    AppointmentService,
    AuthService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCustomInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
