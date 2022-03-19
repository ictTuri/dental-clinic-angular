import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './dashboard/schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthGuardService } from 'src/security/auth-guard.service';
import { UsersComponent } from './dashboard/users/users.component';
import { RoleGuardService } from 'src/security/role-guard.service';
import { AppointmentComponent } from './dashboard/appointments/appointment/appointment.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './dashboard/users/user/user.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //testing routes
  { path: 'usersss', component: UserComponent, canActivate: [AuthGuardService] },
  //end testing routes


  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: 'schedule', component: ScheduleComponent, canActivate: [RoleGuardService], data: {
          role: ['ROLE_ADMIN', 'ROLE_SECRETARY', 'ROLE_PUBLIC']
        }
      },
      {
        path: 'users', component: UsersComponent, canActivate: [RoleGuardService], data: {
          role: ['ROLE_ADMIN']
        }
      },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'appointments', component: AppointmentsComponent, canActivate: [RoleGuardService], data: {
          role: ['ROLE_ADMIN', 'ROLE_SECRETARY', 'ROLE_DOCTOR', 'ROLE_PUBLIC']
        }
      },
      {
        path: 'reports', component: ReportsComponent, canActivate: [RoleGuardService], data: {
          role: ['ROLE_ADMIN', 'ROLE_SECRETARY']
        }
      }
    ]
  },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routesComponents = [
  LoginComponent,
  DashboardComponent,
  ProfileComponent,
  ScheduleComponent,
  AppointmentsComponent,
  ReportsComponent,
  UsersComponent
];
