import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {UserCreateEditComponent} from "../users/user-create-edit/user-create-edit.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue
  }

  openDialog() {
    this.dialog.open(ChangePasswordComponent, {
      data: {
        user: this.user
      }
    });
  }

}
