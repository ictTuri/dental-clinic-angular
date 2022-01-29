import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email', 'phone', 'role', 'edito'];
  user: User[] = [];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _userService: UserService,
    private _matDialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.displayUsers();
  }

  displayUsers() {
    this._userService.getUsers().subscribe({
      next: (v) => {
        this.user = v;
        console.log(this.user);
        this.dataSource = new MatTableDataSource(this.user);
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

  updateUser(row: any) {

  }

  // rezerveAppointement(row: any) {
  //   this._appointmentService.populateForm(row);

  //   const configDialog = new MatDialogConfig();
  //   configDialog.disableClose = true;
  //   configDialog.autoFocus = true;
  //   configDialog.width = '40%';
  //   this._matDialog.open(RezervePopupComponent, configDialog)
  // }

}
