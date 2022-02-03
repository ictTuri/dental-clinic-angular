import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private _jwtHelper: JwtHelperService,
    private _cookie: CookieService
  ) { }

  getRoleFromToken(): string {
    const token = this.getTokenFromCookie();
    const roles = this._jwtHelper.decodeToken(token)['authorities'];
    return roles[0]['authority'];
  }

  getTokenFromCookie(): string {
    return this._cookie.get('jwttoken');
  }
}
