import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './dashboard/schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthGuardService } from 'src/security/auth-guard.service';
import { UserComponent } from './dashboard/users/user/user.component';
import { UsersComponent } from './dashboard/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], children: [
      { path: 'schedule', component: ScheduleComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent }
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
  UsersComponent
];
