import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../app/models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http: HttpClient,
    private _cookie: CookieService
  ) { }

  validateUser(loginUser: LoginUser): Observable<{result: string}> {
    return this._http.post<{result: string}>(environment.restUrl + '_login', loginUser, {
      withCredentials: true
    });
  }

  logout(){
    this._cookie.delete('jwttoken');
    return this._http.post(environment.restUrl + '_logout', {withCredentials: true , responseType: 'text' });
  }
}
