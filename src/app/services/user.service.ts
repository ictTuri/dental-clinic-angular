import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  getLoggedUser(): Observable<User>{
    return this._http.get<User>(environment.restUrl + "users/profile", { withCredentials: true });
  }

  getRole(): Observable<string> {
    return this._http.get(environment.restUrl+'users/role', {withCredentials: true , responseType: 'text'});
  }

  getUsers(): Observable<User[]>{
    return this._http.get<User[]>(environment.restUrl + 'users', { withCredentials: true });
  }
}
