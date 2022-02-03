import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../security/auth.service';
import { LoginUser } from '../models/LoginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginErrorMessage!: string;

  credential!: string;
  password!: string;
  subscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this._authService.authenticationResultEvent.subscribe(
      () => {
        const url = this._activatedRoute.snapshot.queryParams['requested'];
        if (url !== undefined) {
          this._route.navigateByUrl(url);
        } else {
          this._route.navigate(['dashboard']);
        }
      });

    if (this._authService.existCookie()) {
      this._authService.authenticationResultEvent.emit(true);
    } else {
      this._authService.authenticationResultEvent.emit(false);
    }
  }

  login() {
    const loginUser = new LoginUser(this.credential, this.password)
    this._authService.authenticate(loginUser);
    this.subscription = this._authService.authenticationErrorMessage.subscribe(
      (result: string) => {
        if (result) {
          this.loginErrorMessage = result;
        } else {
          this.loginErrorMessage = '';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
