import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.services";
import {UserModel} from "../../models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UserCreateEditComponent} from "../users/user-create-edit/user-create-edit.component";

const ELEMENT_DATA: UserModel[] = [];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastName', 'email'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAllStudents()
      .subscribe( (response) => {
        this.dataSource.data = response
      })
  }

  openDialog() {
    this.dialog.open(UserCreateEditComponent, {
      data: {
        role: 'STUDENT'
      }
    });
  }
}
