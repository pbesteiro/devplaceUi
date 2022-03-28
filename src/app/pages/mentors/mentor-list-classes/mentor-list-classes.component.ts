import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {ChangePasswordComponent} from "../../profile/change-password/change-password.component";
import {MatDialog} from "@angular/material/dialog";
import {MentorUpdateStatusClassComponent} from "../mentor-update-status-class/mentor-update-status-class.component";
import {UserService} from "../../../services/user.services";

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-mentor-list-classes',
  templateUrl: './mentor-list-classes.component.html',
  styleUrls: ['./mentor-list-classes.component.css']
})
export class MentorListClassesComponent implements OnInit {

  user: any
  displayedColumns: string[] = ['date', 'hour', 'commission', 'course', 'subject', 'documents', 'state'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = true
  classes: any[] = []

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue
    this.userService.getUserByEmail(this.user.email)
      .subscribe( (user: any) => {
        this.classes = user.classes;
        localStorage.setItem('classes', JSON.stringify(this.classes))
        this.dataSource.data = this.classes
        console.log(this.classes)
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeState(classId: string, actualCLass: any) {
    this.dialog.open(MentorUpdateStatusClassComponent, {
      data: {
        user: this.user,
        class: actualCLass,
      }
    });
  }

}
