import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-rezerve-popup',
  templateUrl: './rezerve-popup.component.html',
  styleUrls: ['./rezerve-popup.component.scss']
})
export class RezervePopupComponent implements OnInit {
  types: string[] = ['COMPLETE', 'FILLINGS', 'COSMETIC', 'IMPLANTS', 'ORTHODONTICS', 'PREVENTATIVE_CARE', 'PERIODONTAL_THERAPY',
    'NUTRITIONAL_COUNSELING', 'ROOT_CANALS', 'GENERAL'];

  constructor(
    public _appointmentService: AppointmentService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  scheduleTime() {
    if (this._appointmentService.form.valid) {
      this._appointmentService.addSchedule().subscribe({
        next: (v) => {
          console.log(v);
        },
        error: (e) => {
          console.log(e);
        }
      });
      this._matDialog.closeAll();
    }
  }

  closeDialog() {
    this._matDialog.closeAll();
  }
}
