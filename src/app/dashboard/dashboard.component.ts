import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/User';
import { LoginService } from 'src/security/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  user!: User;

  fullname!: string;
  allowedSchedule = false;
  allowedShowUsers = false;
  allowedMyAppointments = false;
  allowedReports = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private _observer: BreakpointObserver,
    private _userService: UserService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this._userService.getRole().subscribe({
      next: (v) => {
        if (v === '[ROLE_ADMIN]') {
          this.allowedSchedule = true;
          this.allowedShowUsers = true;
          this.allowedReports = true;
          this.allowedMyAppointments = false;
        }else if(v === '[ROLE_SECRETARY]'){
          this.allowedSchedule = true;
          this.allowedReports = true;
          this.allowedShowUsers = false;
          this.allowedMyAppointments = false;
        }else if(v === '[ROLE_DOCTOR]'){
          this.allowedSchedule = false;
          this.allowedShowUsers = false;
          this.allowedReports = false;
          this.allowedMyAppointments = true;
        }else if(v === '[ROLE_PUBLIC]'){
          this.allowedSchedule = true;
          this.allowedShowUsers = false;
          this.allowedReports = false;
          this.allowedMyAppointments = true;
        }else{
          console.log('Role Unknown');
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
    this._userService.getLoggedUser().subscribe({
      next: (v) => {
        this.user = v;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngAfterViewInit() {
    this._observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  getUsers() {
    this._userService.getUsers().subscribe({
      next: (v)=>{
        this.users = v;
      },
      error: (e)=>{
        console.log(e);
      }
    });
  }

  logout() {
    this._loginService.logout();
  }
}
