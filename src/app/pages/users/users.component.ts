import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.services";
import { first } from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {UserModel} from "../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {UserCreateEditComponent} from "./user-create-edit/user-create-edit.component";

const ELEMENT_DATA: UserModel[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

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
    this.userService.getAll()
      .pipe(
        first()
      ).subscribe( response => {
      this.dataSource.data = response
    })
  }

  openDialog() {
    this.dialog.open(UserCreateEditComponent);
  }

}
