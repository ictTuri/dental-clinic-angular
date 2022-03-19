import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../interfaces/Appointment';
import { Slot } from '../interfaces/Slot';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  docs: string[] = [];

  constructor(
    private _http: HttpClient
  ) { }

  form: FormGroup = new FormGroup({
    date: new FormControl(),
    startTime: new FormControl(),
    dentist: new FormControl(),
    type: new FormControl([], [Validators.required])
  });

  populateForm(row: any) {
    this.form.setValue({
      date: row.date,
      startTime: row.visitStart,
      type: 'COMPLETE',
      dentist: null
    });
    this.docs = row.doctors;
  }

  //Get free scheduled dates
  freeSchedule(): Observable<Slot[]> {
    return this._http.get<Slot[]>(environment.restUrl + 'visit/free-schedule');
  }

  //Get all appointement
  allAppointments(): Observable<Appointment[]> {
    return this._http.get<Appointment[]>(environment.restUrl + 'visit');
  }

  //Post a new visit
  addSchedule(): Observable<any> {
    return this._http.post(environment.restUrl + 'visit/rezerve', JSON.stringify(this.form.value), { headers: { 'Content-Type': 'application/json' } });
  }
}
