import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.services";
import {MatTableDataSource} from "@angular/material/table";
import {UserModel} from "../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {UserCreateEditComponent} from "../users/user-create-edit/user-create-edit.component";
import {MentorCreateEditComponent} from "./mentor-create-edit/mentor-create-edit.component";

const ELEMENT_DATA: UserModel[] = [];

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastName', 'email'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private usersService: UserService
  ) { }

  ngOnInit(): void {
    this.usersService.getAllMentors()
      .subscribe( (response) => {
        this.dataSource.data = response
      })
  }

  openDialog() {
    this.dialog.open(MentorCreateEditComponent, {
      data: {
        role: 'MENTOR'
      }
    });
  }

}
