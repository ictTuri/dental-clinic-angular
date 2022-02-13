import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  user!: User;

  fullname!: string;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private _observer: BreakpointObserver,
    private _userService: UserService,
    private _loginService: LoginService
  ) { }

  ngOnInit(): void {
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
      .observe(['(max-width: 1000px)'])
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
      next: (v) => {
        this.users = v;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  logout() {
    this._loginService.logout();
  }

  settings() {
    console.log('clicked the settings')
  }
}
