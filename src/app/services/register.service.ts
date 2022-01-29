import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private _http: HttpClient
    ) { }

  register(user: RegisterUser): Observable<any> {
    return this._http.post(environment.restUrl + 'register', user, { responseType: 'text' });
  }
}
