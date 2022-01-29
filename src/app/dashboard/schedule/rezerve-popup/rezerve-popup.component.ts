import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-rezerve-popup',
  templateUrl: './rezerve-popup.component.html',
  styleUrls: ['./rezerve-popup.component.scss']
})
export class RezervePopupComponent implements OnInit {

  constructor(
    public _appointmentService: AppointmentService,
    private _matDialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  scheduleTime(form: FormGroup){
  }

  closeDialog(){
    this._matDialog.closeAll();
  }
}
