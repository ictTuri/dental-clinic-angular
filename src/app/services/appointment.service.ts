import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Slot } from '../interfaces/Slot';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  types: string[] = ['COMPLETE','FILLINGS','COSMETIC','IMPLANTS','ORTHODONTICS','PREVENTATIVE_CARE','PERIODONTAL_THERAPY',
	'NUTRITIONAL_COUNSELING','ROOT_CANALS','GENERAL'];
  docs: string[] = [];

  constructor(
    private _http: HttpClient
  ) { }

  form: FormGroup = new FormGroup({
    date: new FormControl(),
    startTime: new FormControl(),
    dentist: new FormControl(),
    type: new FormControl([],[Validators.required])
  });

  populateForm(row: any) {
    this.form.setValue({
      date: row.date,
      startTime: row.visitStart,
      type: this.types,
      dentist: this.docs
    });
    this.docs = row.doctors;
  }

  freeSchedule(): Observable<Slot[]>{
    return this._http.get<Slot[]>(environment.restUrl+ 'visit/free-schedule', {withCredentials: true});
  }
}