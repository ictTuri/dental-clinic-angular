import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login.service';
import { LoginUser } from '../app/models/LoginUser';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationResultEvent = new EventEmitter<boolean>();
  authenticationErrorMessage = new EventEmitter<string>();
  role!: string;

  constructor(
    private _loginService: LoginService,
    private _cookie: CookieService,
    private _userService: UserService
    ) { }

  authenticate(loginUser: LoginUser){
    this._loginService.validateUser(loginUser).subscribe({
      next: ()=>{
        this.authenticationResultEvent.emit(true);
      },
      error: (e)=>{
        this.authenticationErrorMessage.emit(e.error.message);
        this.authenticationResultEvent.emit(false);
      }
    });
  }

  checkIfAlreadyAuthenticated(){
    this._userService.getRole().subscribe({
      next: (v)=>{
        this.authenticationResultEvent.emit(true);
      },
      error: (e)=>{
        this.authenticationResultEvent.emit(false);
      }
    });
  }

  existCookie(): boolean{
    return !!this._cookie.get('jwttoken');
  }
  
}
