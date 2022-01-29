import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from 'src/app/services/appointment.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Slot } from 'src/app/interfaces/Slot';
import { RezervePopupComponent } from './rezerve-popup/rezerve-popup.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = ['date', 'visitStart', 'visitEnd', 'doctors', 'rezerve'];
  slots: Slot[] = [];
  dataSource!: MatTableDataSource<Slot>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _appointmentService: AppointmentService,
    private _matDialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.freeSchedule();
  }

  freeSchedule() {
    this._appointmentService.freeSchedule().subscribe({
      next: (v) => {
        this.slots = v;
        this.dataSource = new MatTableDataSource(this.slots);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  rezerveAppointement(row: any) {
    this._appointmentService.populateForm(row);

    const configDialog = new MatDialogConfig();
    configDialog.disableClose = true;
    configDialog.autoFocus = true;
    configDialog.width = '40%';
    this._matDialog.open(RezervePopupComponent, configDialog)
  }

}
