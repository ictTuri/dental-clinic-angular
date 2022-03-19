import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private _route: Router,
    private _authService: AuthService,
    private _jwt: JwtService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this._authService.existCookie()) {
      const role = this._jwt.getRoleFromToken();
      if (route.data['role'] && route.data['role'].indexOf(role) === -1) {
        this._route.navigate(['/dashboard']);
        return false;
      }
      return true;
    }
    this._route.navigate(['/dashboard']);
    return false;
  }
}
