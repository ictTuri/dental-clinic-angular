import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../app/services/login.service';
import { LoginUser } from '../app/models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationResultEvent = new EventEmitter<boolean>();
  authenticationErrorMessage = new EventEmitter<string>();

  constructor(
    private _loginService: LoginService,
    private _cookie: CookieService
  ) { }

  authenticate(loginUser: LoginUser) {
    this._loginService.validateUser(loginUser).subscribe({
      next: () => {
        this.authenticationResultEvent.emit(true);
      },
      error: (e) => {
        this.authenticationErrorMessage.emit(e.error.message);
        this.authenticationResultEvent.emit(false);
      }
    });
  }

  checkIfAlreadyAuthenticated() {
    if (this.existCookie()) {
      this.authenticationResultEvent.emit(true);
    }
    this.authenticationResultEvent.emit(false);
  }

  existCookie(): boolean {
    return !!this._cookie.get('jwttoken');
  }

}
