import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  users!: User[];

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this._userService.getLoggedUser().subscribe({
      next: (v)=>{
        this.user = v;
      },
      error: (e)=>{
        console.log(e);
      }
    });
  }

}
